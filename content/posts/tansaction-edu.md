---
title: "📝트랜잭션 이해와 Spring"
date: "2025-03-03T22:12:03.284Z"
thumbnail: ./images/transaction.png
tag: 트랜잭션,AOP,커넥션풀
series: CS
---

# 개념
가장 많이 비유되는 것이 ATM

## ACID
- 원자성(Atomicity): 모두 성공하거나 모두 실패해야한다.
- 일관성(Consistency): 모든 트랜잭션은 일관성있는 데이터베이스 상태를 유지해야 한다.
- 격리성(Isolation): 동시에 실행되는 트랜잭션들은 서로 영향을 미치면 안된다.
- 지속성(Durability): 트랜잭션의 모든 결과가 항상 기록되어야 한다. 시스템 문제 발생 시 성공한 트랜잭션으로 복구를 위한 로그를 남겨야 한다.

트랜잭션은 원자성, 일관성, 지속성을 보장한다. 하지만 격리성을 완벽히 보장하려고 하면 `동시 처리 성능`이 나빠진다.

## 트랜잭션 격리 수준(Isolation Level)
- READ UNCOMMITED(커밋되지 않은 읽기): 변경 중인 데이터 읽기 가능
- READ COMMITTED(커밋된 읽기): 실무에서 많이 사용, 커밋한 내용을 읽기
- REPEATABLE READ(반복 가능한 읽기)
- SERIALIZABLE(직렬화 가능)

# 사용법
- COMMIT: 쿼리 결과 반영 O
- ROLLBACK: 쿼리 결과 반영 X
보통 AUTOCOMMIT이 TRUE로 지정되어 있다.   
AUTOCOMMIT을 FALSE로 설정하는 것을 트랜잭션을 시작 한다라고 표현한다.

# DB 락 - 개념
여러명의 사용자가 동일한 데이터를 변경하려고 할 때 필요한 기능이다.   
먼저 접근한 사용자가 락을 획득하고 다른 사용자는 락을 얻을 때 까지 대기한다.   
대기 시간은 다음과 같이 지정한다.
```sql
SET LOCK_TIMEOUT <milliseconds>
``` 
## DB 락 - 조회
일반적인 조회는 락을 사용하지 않지만, 트랜잭션 종료 시점까지 다른 곳에서 데이터를 변경하지 못하도록 막아야 할 때 사용된다.   
```sql
select * from member where member_id='memberA' for update;
```

# 커넥션 풀
데이터베이스 커넥션을 얻기 위해서는 다음과 같은 코드가 추가된다.
```java
Connection connection = DriverManager.getConnection(URL, USERNAME, PASSWORD);
```
해당 코드는 TCP/IP, 3-way-handshake 같은 세세한 네트워크 동작이 일어난다.   
이는 시간이 많이 소모되는 일이며 UX측면에서 좋지 않다.

이를 해결하기 위해 `미리 커넥션을 생성해두고 사용하는 방식`이 커넥션 풀이다.   
실무에서 무조건 사용한다고 보면 된다.   
hikariCP 가 대표적인 커넥션 풀 오픈소스이자 가장 많이 사용된다.

# DataSource
그러면 이렇게 좋은 커넥션 풀을 사용하기위해 기존에 사용하던 방식인   
DriverManager를 통해 커넥션을 생성하는 것이 아닌 풀에서 가져오려고 한다.   
그러면 애플리케이션 로직에서 코드의 변경이 필요하다.(JAVA에서 제일 싫어하는 것 : 코드 변경)

따라서 커넥션을 얻는 방법을 추상화한 것이 DataSource이다.

# 트랜잭션 적용 시점
트랜잭션은 비즈니스 로직이 있는 서비스 계층에서 시작해야 한다.   
트랜잭션을 위한 커넥션을 만들고 동일한 커넥션을 끝까지 유지해야한다.   
애노테이션을 사용하지않는 방법으로는 커넥션을 파라미터로 넘겨주는 방법이 있다.

# 문제점 #1
하지만 매개변수가 많아지고 비즈니스 로직에 트랜잭션 관련 코드가 추가되며 JDBC 기술에 의존하게 된다.   
이는 향후 JDBC에서 JPA같은 다른 기술로 변경하게 되면 서비스 코드도 함께 변경해야한다.   
```java
private final DataSource dataSource;
private final MemberRepositoryV2 memberRepository;
//다음과 같이 비즈니스 로직 5줄 이외에는 전부 트랜잭션 코드이다.
//또한 dataSource.getConnection(); 같은 JDBC 기술에 의존하고 있다.
//JDBC를 JPA로 변경하게 된다면 코드가 바뀌게 되고 단일책임원칙(SRP)을 위배하게 된다.
public void accountTransfer(String fromId, String toId, int money) throws SQLException {
    Connection con = dataSource.getConnection();
    try{
        con.setAutoCommit(false);//트랜잭션 시작

        //비즈니스 로직
        Member fromMember = memberRepository.findById(con,fromId);
        Member toMember = memberRepository.findById(con,toId);

        memberRepository.update(con,fromId, fromMember.getMoney() - money);
        validation(toMember);
        memberRepository.update(con,toId, toMember.getMoney() + money);

        con.commit();//성공시  커밋
    }catch (Exception e){
        con.rollback();//실패시 롤백
        throw new IllegalStateException(e);
    }finally{
        release(con);
    }
}
```

이를 위해 Spring에서는 트랜잭션 추상화를 위한 Platform Transaction Manager를 이용한다.

# 트랜잭션 추상화

DataSource를 직접 가져다 사용하는 것이 아닌 PlatformTransactionManager를 이용하여 추상화를 하였다.

```java
private final PlatformTransactionManager transactionManager;
private final MemberRepositoryV3 memberRepository;

public void accountTransfer(String fromId, String toId, int money) throws SQLException {
    //트랜잭션 시작
    //status에는 트랜잭션의 상태 정보가 담겨있다
    TransactionStatus status = transactionManager
                                    .getTransaction(new DefaultTransactionDefinition());
    try {
        //비즈니스 로직
        Member fromMember = memberRepository.findById(fromId);
        Member toMember = memberRepository.findById(toId);

        memberRepository.update(fromId, fromMember.getMoney() - money);
        validation(toMember);
        memberRepository.update(toId, toMember.getMoney() + money);

        transactionManager.commit(status);//성공시  커밋
    } catch (Exception e) {
        transactionManager.rollback(status);//실패시 롤백
        throw new IllegalStateException(e);
    }
}
```
예제에서는 의존성 주입을 하지 않았지만 테스트 단위에서 다음과 같이 JDBC 의존성을 주입하고 테스트 해볼 수 있다.
```java
PlatformTransactionManager transactionManager = 
                        new DataSourceTransactionManager(dataSource);
```

# 문제점 #2
이제는 트랜잭션 시작, 성공시 커밋, 실패시 롤백도 반복되는 것이 보기 싫다.   
Spring에는 TransactionTemplate라는 템플릿 클래스를 이용해 템플릿 콜백 패턴을 활용하면 깔끔하게 할 수 있다.   
```java
private final TransactionTemplate txTemplate;//
private final MemberRepositoryV3 memberRepository;

public MemberServiceV3_2(PlatformTransactionManager transactionManager, MemberRepositoryV3 memberRepository) {
    this.txTemplate = new TransactionTemplate(transactionManager);
    this.memberRepository = memberRepository;
}

public void accountTransfer(String fromId, String toId, int money) throws SQLException {
    txTemplate.executeWithoutResult((status)->{
        //비즈니스 로직
        try{
            Member fromMember = memberRepository.findById(fromId);
            Member toMember = memberRepository.findById(toId);
            memberRepository.update(fromId, fromMember.getMoney() - money);
            validation(toMember);
            memberRepository.update(toId, toMember.getMoney() + money);
        }catch (SQLException e){
            throw new IllegalStateException(e);
        }
    });
}
```
템플릿 내부에서 트랜잭션 시작과 롤백과 커밋을 관리한다.   
`언체크예외, 런타임 예외는 롤백하지만 체크예외는 롤백하지 않고 커밋한다.`

# 문제점 #3
그래도 비즈니스 로직에 트랜잭션 로직이 들어가있는 것이 불만이다.   
엄연히 비즈니스 로직이 핵심인데 트랜잭션은 부가 기능이기 때문에 유지보수성을 고려하였을 때 분리해야 한다.

이를 위한 것이 `트랜잭션 AOP 프록시`이다.

# AOP 프록시 적용
```java
@Transactional
public void accountTransfer(String fromId, String toId, int money) throws SQLException {
    //비즈니스 로직
    Member fromMember = memberRepository.findById(fromId);
    Member toMember = memberRepository.findById(toId);
    memberRepository.update(fromId, fromMember.getMoney() - money);
    validation(toMember);
    memberRepository.update(toId, toMember.getMoney() + money);
}
```

# 트랜잭션 관리
- 선언적 트랜잭션 관리: @Transactional 처럼 트랜잭션을 사용하겠다고 선언
- 프로그래밍 방식 트랜잭션 관리: 그 위의 수많은 코드들이 프로그래밍 방식

대부분은 선언적 트랜잭션 관리를 사용하지만 테스트 코드에 가끔 사용이 된다.

# 문제점 #4
트랜잭션 관련 로직이 깔끔하게 사라졌지만 SQLException을 의존하고있다.

# 체크, 언체크 예외

# 체크예외 문제점

# 언체크에외 활용
```java
public void update(String memberId, int money){
    String sql = "update member set money=? where member_id = ?";

    Connection con = null;
    PreparedStatement pstmt = null;

    try {
        con = getConnection();
        pstmt = con.prepareStatement(sql);
        pstmt.setInt(1, money);
        pstmt.setString(2, memberId);
        int resultSize = pstmt.executeUpdate();//수정한 row수 반환

        log.info("resultSize={}", resultSize);
    } catch (SQLException e) {
        //체크 예외가 발생했을 경우
        //MyDbException이라는 커스텀 예외를 던진다
        throw new MyDbException(e);
    } finally {
        close(con, pstmt, null);
    }
}
```
SQLException이라는 체크 예외가 발생했을 경우, MyDbException이라는 커스텀 예외를 던진다.

```java
public class MyDbException  extends RuntimeException{
    public MyDbException() {
    }

    public MyDbException(String message) {
        super(message);
    }

    public MyDbException(String message, Throwable cause) {
        super(message, cause);
    }

    public MyDbException(Throwable cause) {
        super(cause);
    }
}
```
그리고 MyDbException 커스텀 예외는 RuntimeException이라는 언체크 예외를 상속받는다.    
따라서 Repository에서 발생한 언체크예외는 서비스도 통과하고 컨트롤러도 통과한다.   
이렇게 통과한 예외는 한 곳에서 일괄적으로 관리한다.   

# 문제점 #5
만약 Repository 단계에서 예외가 발생했을 때 던지지 않고 해결하고 싶을 때는 어떻게 해야 할까?
```java
try {
    con = dataSource.getConnection();
    pstmt = con.prepareStatement(sql);
    pstmt.setString(1, member.getMemberId());
    pstmt.setInt(2, member.getMoney());
    pstmt.executeUpdate();
    return member;
} catch (SQLException e) {
    if (e.getErrorCode() == 23505) {
        throw new MyDuplicateKeyException(e);
    }
    throw new MyDbException(e);
} finally {
    JdbcUtils.closeStatement(pstmt);
    JdbcUtils.closeConnection(con);
}
```
발생한 SQLException 의 에러코드를 분석해서 별도 지정한 커스텀 예외를 던지도록 할 수 있다.   
문제는 에러코드인데, 이 에러코드는 각 DB의 종류마다 다르기 때문에 또 유지보수성에서 문제가 발생한다.   
최종적으로 이를 보완한 것이 Spring의 TSQLExceptionTranslator 이다.

# Translator
```java
try {
    con = getConnection();
    pstmt = con.prepareStatement(sql);
    pstmt.setString(1, memberId);
    //조회 할 때는 executeQuery 사용
    rs = pstmt.executeQuery();
    if (rs.next()) {
        Member member = new Member();
        member.setMemberId(rs.getString("member_id"));
        member.setMoney(rs.getInt("money"));
        return member;
    } else {
        throw new NoSuchElementException("member not found memberId=" + memberId);
    }
} catch (SQLException e) {
    //이 한줄로 어떤 오류인지 해석해서 알려준다.
    throw exTranslator.translate("findById", sql, e);
} finally {
    close(con, pstmt, rs);
}
```
Spring에는 이미 대부분의 DB 에러코드가 내장되어 있다.   
이를 통해 Mybatis를 쓰던 MySQL을 쓰던 H2를 쓰던 동일한 코드를 통해 예외를 잡을 수 있게 된다.   

# 문제점 #6
전체 코드의 일부를 가져왔다.
```java
@Override
public Member save(Member member){
    String sql = "insert into member(member_id, money) values (?,?)";
    //참고로 SQL Injection을 예방하기 위해 PreparedStatement이용한 파라미터 바인딩 방식을 사용해야 한다
    Connection con = null;
    PreparedStatement pstmt = null;//쿼리 바인딩

    try {
        con = getConnection();//커넥션을 받고
        //쿼리 작업 시작
        pstmt = con.prepareStatement(sql);
        pstmt.setString(1, member.getMemberId());
        pstmt.setInt(2, member.getMoney());
        //작업 완료된 쿼리 실행
        pstmt.executeUpdate();
        return member;
    } catch (SQLException e) {
        throw exTranslator.translate("save", sql, e);
    } finally {
        close(con, pstmt, null);
    }
}
@Override
public Member findById(String memberId) {
    String sql = "select * from member where mber_id = ?";

    Connection con = null;
    PreparedStatement pstmt = null;
    ResultSet rs = null;

    try {
        con = getConnection();
        pstmt = con.prepareStatement(sql);
        pstmt.setString(1, memberId);
        //조회 할 때는 executeQuery 사용
        rs = pstmt.executeQuery();
        if (rs.next()) {
            Member member = new Member();
            member.setMemberId(rs.getString("member_id"));
            member.setMoney(rs.getInt("money"));
            return member;
        } else {
            throw new NoSuchElementException("member not found memberId=" + memberId);
        }
    } catch (SQLException e) {
        throw exTranslator.translate("findById", sql, e);
    } finally {
        close(con, pstmt, rs);
    }
}
@Override
public void update(String memberId, int money){
    String sql = "update member set money=? where member_id = ?";

    Connection con = null;
    PreparedStatement pstmt = null;

    try {
        con = getConnection();
        pstmt = con.prepareStatement(sql);
        pstmt.setInt(1, money);
        pstmt.setString(2, memberId);
        int resultSize = pstmt.executeUpdate();//수정한 row수 반환

        log.info("resultSize={}", resultSize);
    } catch (SQLException e) {
        throw exTranslator.translate("update", sql, e);
    } finally {
        close(con, pstmt, null);
    }
}

@Override
public void delete(String memberId) {
    String sql = "delete from member where member_id = ?";

    Connection con = null;
    PreparedStatement pstmt = null;

    try {
        con = getConnection();
        pstmt = con.prepareStatement(sql);
        pstmt.setString(1, memberId);
        pstmt.executeUpdate();
    } catch (SQLException e) {
        throw exTranslator.translate("delete", sql, e);
    } finally {
        close(con, pstmt, null);
    }
}
```
모든 메서드마다 try-catch와 Connection, Statement같은 중복된 코드가 보이는 것을 알 수 있다.
이는 JdbcTemplate 가 해결해준다.

# JdbcTemplate
```java
@Override
public Member save(Member member) {
    String sql = "insert into member(member_id, money) values (?,?)";
    template.update(sql, member.getMemberId(), member.getMoney());
    return member;
}

@Override
public Member findById(String memberId) {
    String sql = "select * from member where member_id = ?";
    return template.queryForObject(sql, memberRowMapper(), memberId);
}

private RowMapper<Member> memberRowMapper() {
    return (rs, rowNum) -> {
        Member member = new Member();
        member.setMemberId(rs.getString("member_id"));
        member.setMoney(rs.getInt("money"));
        return member;
    };
}

@Override
public void update(String memberId, int money) {
    String sql = "update member set money=? where member_id = ?";
    template.update(sql, money, memberId);
}

@Override
public void delete(String memberId) {
    String sql = "delete from member where member_id = ?";

    template.update(sql, memberId);
}
```
JdbcTemplate가 커넥션, 쿼리실행, 예외처리, 커넥션 반환까지 전부 관리한다.