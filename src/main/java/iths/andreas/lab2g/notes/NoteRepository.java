package iths.andreas.lab2g.notes;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NoteRepository extends JpaRepository<Note, Long> {

    List<Note> findByCategory(String category);

    List<Note> findByNotCompleted(boolean completed);

}
