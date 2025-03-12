---
title: "📝Servlet(서블릿)"
date: "2025-03-09T23:23:49.284Z"
thumbnail: 
tag: Servlet
series: CS
---

# Servlet
서블릿은 지정한 URL이 호출되면 HTTP 요청과 응답 정보를 각각   
<o1>HttpServletRequest</o1>객체와 <o1>HttpServletResponse</o1>객체로 할당한다.

<verticalSpace></verticalSpace>

# HttpServletRequest
- HTTP 요청 메세지를 파싱해주어서 <o1>HttpServletRequest</o1>에 담아준다.
- <b1>HTTP 요청 메세지를 편리하게 사용하도록 도와주는 객체</b1>
- HTTP 요청 메세지
    ```html
    <START_LINE>
    POST /save HTTP/1.1
    <HEADER>
    Host: localhost:8080
    Content-Type: application/x-www-form-urlencoded
    <BODY>
    username=kim&age=20
    ```

<verticalSpace></verticalSpace>

# HTTP 요청 데이터 3가지
- GET - 쿼리 파라미터
    - `http://localhost:8080/request-param?username=hello&age=20`
    - Body 없이, URL의 쿼리 파라미터에 데이터를 포함
    - <b1>Body가 없기 때문에 content-type = null<b1/>
    - ex) 필터, 페이징, 조회
- POST - HTML Form
    - `username=hello&age=20`
    - Body에 쿼리 파라미터 데이터를 담아 전달
    - content-type = application/x-www-form-urlencoded
    - ex) 회원가입, 상품주문
- HTTP message body를 통해 요청
    - Body에 TEXT 또는 JSON 형식으로 데이터를 전달
    - ex) POST, PUT, PATCH

<verticalSpace></verticalSpace>

# HttpServletResponse
단순 text나 심지어 html코드를 담을 수도 있지만, <b1>주 형태는 JSON</b1> 으로   
Jackson라이브러리의 ObjectMapper를 이용하여 JSON 문자로 변경한다.
```java
private ObjectMapper objectMapper = new ObjectMapper();
    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response){
        //HttpServletResponse 반환 객체의 헤더를 설정
        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");

        //class 이름은 HelloData 이지만 용도는 DTO
        HelloData helloData = new HelloData();
        helloData.setUsername("kim");
        helloData.setAge(20);

        //JSON 형태로 매핑
        String result = objectMapper.writeValueAsString(helloData);

        response.getWriter().write(result);
    }
```

