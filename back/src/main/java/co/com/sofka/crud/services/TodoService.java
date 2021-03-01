package co.com.sofka.crud.services;

import co.com.sofka.crud.dto.DtoTodo;
import co.com.sofka.crud.repository.TodoRepository;
import co.com.sofka.crud.domain.Todo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;


import java.util.ArrayList;

import java.util.List;

@Service
@Validated
public class TodoService {

    @Autowired
    private TodoRepository repository;

    public Iterable<DtoTodo> list(){
        List<DtoTodo> dtoList = new ArrayList<>();
         repository.findAll().forEach((todo -> {
             DtoTodo itemdto = new DtoTodo();
             itemdto.todoDto(todo);
             dtoList.add(itemdto);
         }));
        return dtoList;
    }

    public DtoTodo save(DtoTodo dtoTodo){
        if(!dtoTodo.getName().equals(""))
        {Todo todo = dtoTodo.dtoTodo();
            repository.save(todo);
            dtoTodo.todoDto(todo);
            return  dtoTodo;}
        return null;

    }

    public void delete(Long id){
        repository.delete(get(id).dtoTodo());
    }

    public DtoTodo get(Long id){
        DtoTodo dtoTodo = new DtoTodo();
        dtoTodo.todoDto(repository.findById(id).orElseThrow());
         return dtoTodo;
    }

}
