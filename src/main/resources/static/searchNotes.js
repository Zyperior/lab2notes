function search(category){

    var resultListTable = document.getElementById("listResults");
    var xhttp = new XMLHttpRequest();
    if(category===""){
        xhttp.open("GET","/notes", false);
    }
    else if(category==="notCompleted"){
        xhttp.open("GET","/notes/completed", false);
    }
    else{
        xhttp.open("GET","/category/" + category, false);
    }
    xhttp.send();


    if(xhttp.readyState===4 && xhttp.status===200){

        var notesJSON = JSON.parse(xhttp.responseText);

        if(notesJSON.length>0){
            resultListTable.innerHTML="";
        }

        for(var note in notesJSON){

            var tableRow = document.createElement("div");
            tableRow.setAttribute("class", "divTableRow");
            tableRow.setAttribute("tabIndex", note);
            tableRow.setAttribute("onfocus","findOneNote(" + notesJSON[note].id + ")");

            var tableRowOverlay = document.createElement("div");
            tableRowOverlay.setAttribute("class","overlay");

            var tableCellId = document.createElement("div");
            tableCellId.setAttribute("class", "divTableListID");
            tableCellId.innerHTML=notesJSON[note].id;

            var tableCellTitle = document.createElement("div");
            tableCellTitle.setAttribute("class", "divTableListTitle");
            tableCellTitle.innerHTML=notesJSON[note].title;

            var tableCellCategory = document.createElement("div");
            tableCellCategory.setAttribute("class", "divTableListCategory");
            tableCellCategory.innerHTML=notesJSON[note].category;

            var tableCellDate = document.createElement("div");
            tableCellDate.setAttribute("class", "divTableListDate");
            tableCellDate.innerHTML=notesJSON[note].date;

            var tableCellComplete = document.createElement("div");
            tableCellComplete.setAttribute("class", "divTableListComplete");
            if(notesJSON[note].notCompleted){
                tableCellComplete.setAttribute("style","background:red")
            }
            else{
                tableCellComplete.setAttribute("style","background:green")
            }

            tableRowOverlay.appendChild(tableCellId);
            tableRowOverlay.appendChild(tableCellTitle);
            tableRowOverlay.appendChild(tableCellCategory);
            tableRowOverlay.appendChild(tableCellDate);
            tableRowOverlay.appendChild(tableCellComplete);
            tableRow.appendChild(tableRowOverlay);
            resultListTable.appendChild(tableRow);
        }

    }


}

function createNewOrUpdate(id, title, text, category, completed){

    var xhttp = new XMLHttpRequest();
    var noteJSON = "{\"title\":\"" + title + "\", \"text\":\"" + text + "\", \"category\":\"" + category + "\", \"notCompleted\":\"" + completed + "\"}";
    if(id===""){
        xhttp.open("POST","/notes",true);
    }
    else{
        xhttp.open("PUT","/notes/" + id,true);
    }

    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(noteJSON);

    setTimeout(function () {
        search("");
    },500);

}

function findOneNote(id) {
    var xhttp = new XMLHttpRequest();

    xhttp.open("GET","/notes/" +id, false);
    xhttp.send();

    var divID = document.getElementById("noteID");
    var divTitle = document.getElementById("titleInput");
    var divText = document.getElementById("noteMainText");
    var divCat = document.getElementById("catTxt");
    var divDateTime = document.getElementById("dateTimeText");
    var divCompleted = document.getElementById("completedBox");

    if(xhttp.readyState===4 && xhttp.status===200) {

        var notesJSON = JSON.parse(xhttp.responseText);

        divID.innerText=notesJSON.id;
        divTitle.innerText=notesJSON.title;
        divText.innerText=notesJSON.text;
        divCat.innerText=notesJSON.category;
        divDateTime.innerText=notesJSON.date + " : " + notesJSON.time;
        if(notesJSON.notCompleted){
            divCompleted.checked="";
            completedChange();
        }
        else{
            divCompleted.checked="checked";
            completedChange();
        }

    }

}

function clearAllForNew(){
    var divID = document.getElementById("noteID");
    var divTitle = document.getElementById("titleInput");
    var divText = document.getElementById("noteMainText");
    var divCat = document.getElementById("catTxt");
    var divDateTime = document.getElementById("dateTimeText");
    var divCompleted = document.getElementById("completedBox");

    divID.innerText="";
    divTitle.innerText="Your title...";
    divText.innerText="Your notes...";
    divCat.innerText="Select Category";
    divDateTime.innerText="Date-time";

    divCompleted.checked="";
    completedChange();
}

function deleteNote(id) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/notes/" + id, false);
    xhttp.send();

    if(xhttp.readyState===4 && xhttp.status===200) {
        location.reload();
    }


}