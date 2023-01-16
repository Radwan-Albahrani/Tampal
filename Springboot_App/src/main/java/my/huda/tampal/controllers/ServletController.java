package my.huda.tampal.controllers;

import my.huda.tampal.protos.TampalProtos.*;
import my.huda.tampal.service.TampalService;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/")
public class ServletController
{

    // redirect to login
    @GetMapping(value = "")
    public String redirectToLogin()
    {
        return "redirect:/login";
    }

    @GetMapping(value = "login")
    public String login(@CookieValue(name = "userID", defaultValue = "default-user-id") String currentUser)
    {
        if (currentUser.equals("default-user-id"))
        {
            return "login";
        }
        else
        {
            return "redirect:/user/" + currentUser;
        }
    }

    @GetMapping(value = "register")
    public String register()
    {
        return "register.html";
    }

    @GetMapping(value = "user/{id}")
    public ModelAndView mainPage(@PathVariable("id") String id,
            @CookieValue(name = "userID", defaultValue = "default-user-id") String currentUser)
    {
        if (id.equals(currentUser))
        {
            ModelAndView mav = new ModelAndView("user-page");
            mav.addObject("id", id);
            mav.addObject("editable", true);
            return mav;
        }
        else
        {
            ModelAndView mav = new ModelAndView("user-page");
            mav.addObject("id", id);
            mav.addObject("editable", false);
            return mav;
        }
    }

    @GetMapping(value = "user/{id}/create")
    public ModelAndView createPage(@PathVariable("id") String id,
            @CookieValue(name = "userID", defaultValue = "default-user-id") String currentUser)
    {
        if (id.equals(currentUser))
        {
            ModelAndView mav = new ModelAndView("display-paste");
            mav.addObject("id", id);
            mav.addObject("pasteID", "-1");
            mav.addObject("mode", "create");
            return mav;
        }
        else
        {
            return new ModelAndView("redirect:/user/" + currentUser);
        }
    }

    @GetMapping(value = "user/{id}/edit/{pasteID}")
    public ModelAndView editPage(@PathVariable("id") String id, @PathVariable("pasteID") String pasteID,
            @CookieValue(name = "userID", defaultValue = "default-user-id") String currentUser)
    {
        if (id.equals(currentUser))
        {
            ModelAndView mav = new ModelAndView("display-paste");
            mav.addObject("id", id);
            mav.addObject("pasteID", pasteID);
            mav.addObject("mode", "edit");
            return mav;
        }
        else
        {
            return new ModelAndView("redirect:/user/" + currentUser);
        }
    }

}
