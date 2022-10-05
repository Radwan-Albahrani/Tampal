package my.huda.tampal;

import java.io.IOException;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.nio.file.Files;
import java.nio.file.Path;

public class ExampleServlet extends HttpServlet
{
    // Override normal doGet function for easier readability
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
    {
        response.setContentType("text/html");
        Path filename = Path.of("./data/html.txt");
        String str = Files.readString(filename);
        response.getWriter().println(str);
    }

}