package iths.andreas.lab2g.notes;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class NoteNotFoundAdvice {

    @ExceptionHandler(NoteNotFoundExeption.class)
    @ResponseBody
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String productNotFound(NoteNotFoundExeption exception){
        return exception.message;
    }
}
