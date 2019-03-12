package iths.andreas.lab2g.notes;

import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:63342")
@RestController
public class NotesController {

    private NoteRepository noteRepository;

    public NotesController(NoteRepository noteRepository){
        this.noteRepository=noteRepository;
    }

    @GetMapping("/notes")
    public Iterable<Note> getAll(){
        return noteRepository.findAll();
    }

    @GetMapping("/category/{category}")
    public Iterable<Note> getCategory(@PathVariable String category) {

        return noteRepository.findByCategory(category);

    }

    @GetMapping("/notes/completed")
    public Iterable<Note> getNotCompleted() {

        return noteRepository.findByNotCompleted(true);

    }

    @GetMapping("/notes/{id}")
    public Note getOne(@PathVariable Long id) {
        return noteRepository.findById(id).orElseThrow(() ->
                new NoteNotFoundExeption("Note with id " + id + " not found"));
    }

    @PutMapping("/notes/{id}")
    public Note updateNote(@RequestBody Note note, @PathVariable Long id) {
        return noteRepository.findById(id).map( storedNote -> {
            storedNote.setTitle(note.getTitle());
            storedNote.setText(note.getText());
            storedNote.setCategory(note.getCategory());
            storedNote.setNotCompleted(note.isNotCompleted());
            return noteRepository.save(storedNote);

        }).orElseThrow(() -> new NoteNotFoundExeption("Note with id " + id + " not found"));
    }

    @PostMapping("/notes")
    public void postNew(@RequestBody Note note) {
        note.setDate(LocalDate.now());
        note.setTime(LocalTime.now());
        noteRepository.save(note);
    }

    @DeleteMapping("/notes/{id}")
    public void deleteNote(@PathVariable Long id){
        noteRepository.deleteById(id);
    }
}
