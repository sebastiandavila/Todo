package co.com.sofka.crud.controller;


import co.com.sofka.crud.dto.DtoTodo;
import co.com.sofka.crud.services.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TodoController {

    @Autowired
    private TodoService service;

    @GetMapping(value = "api/todos")
    public Iterable<DtoTodo> list(){
        return service.list();
    }
    
    @PostMapping(value = "api/todo")
    public DtoTodo save(@RequestBody DtoTodo dtoTodo){

        return service.save(dtoTodo);
    }

    @PutMapping(value = "api/todo")
    public DtoTodo update(@RequestBody DtoTodo dtoTodo){

        if(dtoTodo != null){
            return service.save(dtoTodo);
        }
        throw new RuntimeException("No existe el id para actualizar");
    }

    @DeleteMapping(value = "api/{id}/todo")
    public void delete(@PathVariable("id")Long id){
        service.delete(id);
    }

    @GetMapping(value = "api/{id}/todo")
    public DtoTodo get(@PathVariable("id") Long id){
        return service.get(id);
    }

}
