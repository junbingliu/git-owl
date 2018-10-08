<%@ page import="net.xinshi.pigeon.util.ClientTools" %>
<%@ page import="org.apache.commons.lang.StringUtils" %>
<%@ page import="java.io.File" %>
<%--
  Created by IntelliJ IDEA.
  User: mac
  Date: 12-12-9
  Time: 下午11:24
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%

    String filePath = request.getParameter("filePath");
    if (StringUtils.isNotBlank(filePath)) {
        long begin = System.currentTimeMillis();
        ClientTools.convertAll(new File(filePath));
        long end = System.currentTimeMillis();
        request.setAttribute("totalTime", end - begin);
    }

%>


<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
    <title>转换pigeon1 to pigeon2</title>
    <link href="/resources/bootstrap2.03/css/bootstrap.css" rel="stylesheet">
</head>
<body>
<fieldset class="well fieldset">
    <form action="convert.jsp">
        <div class="control-group">
            <label class="control-label" for="filePath"><span style="color: red;"></span>待转换JS的绝对路径</label>
            <div class="controls">
                <input type="text" style="width:600px;height: 28px" id="filePath" name="filePath">
            </div>
        </div>
        <div class="span12">
            <div class="offset6">
                <button type="submit" class="btn btn-primary" id="submit">提 交</button>
            </div>
        </div>
    </form>
</fieldset>
<c:if test="${not empty totalTime}" >
    Success!!
    耗时：${totalTime}ms
</c:if>

</body>
</html>