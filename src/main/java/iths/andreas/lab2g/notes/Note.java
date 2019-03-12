package iths.andreas.lab2g.notes;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Data
public class Note {

    @Id @GeneratedValue private long id;
    private String title;
    private String category;
    private String text;
    private java.time.LocalDate date;
    private java.time.LocalTime time;
    private boolean notCompleted;
}
