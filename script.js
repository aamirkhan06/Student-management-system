// 1 student object:-
//{"id":1,"first_name":"Chadwick","last_name":"Ayre","email":"cayre0@cam.ac.uk",
//"gender":"Male","img_src":"https://robohash.org/corporisquiaperiam.png?size=50x50&set=set1",
//"class":11,"marks":18,"passing":false,"city":"Moorreesburg"}

//header:- id ,name, gender, class, marks, passing, email






let tHead= document.querySelector("thead");

//insert rows in column head
let tableRow=tHead.insertRow();
let theadData=['Id','Name','Gender','Class','Marks','Passing','Email'];
let tbody= document.querySelector("tbody");

for(let data of theadData)
{
    let th=document.createElement("th");
    th.innerHTML=data;
    tableRow.appendChild(th);
}


//import json file
let data=[];
async function fetchData() {
    try {
        const response = await fetch('https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json');
        data = await response.json();
        // Process the data and create HTML elements

        data= data.map(obj => ({
            img:obj.img_src,
            Id: obj.id,
            Name: `${obj.first_name} ${obj.last_name}`,
            firstName: obj.first_name,
            lastName: obj.last_name,
            Gender: obj.gender,
            Class: obj.class,
            Marks: obj.marks,
            Passing: obj.passing,
            Email: obj.email
        }));

        console.log(data);
        ShowData(data);
        // ...
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchData();

//adding rows and data to my table body

function ShowData(data)
{
    

    for(let i=0;i<data.length;i++)
    {
        let row=tbody.insertRow();
        for(let j=0;j<theadData.length;j++)
        {
            let td=document.createElement("td");
            if(theadData[j]=="Name")
            {
                td.innerHTML=`<img height=30px src="${data[i].img}"> ${data[i][theadData[j]]}`;
            }
            else if(theadData[j]=="Passing")
            {
                if(data[i][theadData[j]]) td.innerHTML=`passing`;
                else td.innerHTML=`failed`;
            }
            else{
                td.innerHTML=data[i][theadData[j]];
            }

            td.className=theadData[j];
            row.appendChild(td);
        }
    }
}


// sort A->Z
function sortAToZ()
{
    //initially tbody will be empty
    tbody.innerHTML="";
    let sortedByNameAsc = data.slice().sort((a, b) => a.Name.localeCompare(b.Name));
    ShowData(sortedByNameAsc);
}

//sort Z->A

function sortZToA()
{
    //initially tbody will be empty
    tbody.innerHTML="";
    let sortedByNameDesc = data.slice().sort((a, b) => b.Name.localeCompare(a.Name));
    ShowData(sortedByNameDesc);
}

//sort by marks

function sortByMarks()
{
    //initially tbody will be empty
    tbody.innerHTML="";
    let sortedByMarksAsc = data.slice().sort((a, b) => a.Marks - b.Marks);
    ShowData(sortedByMarksAsc);
}

//sort by passing

function sortByPassing()
{
    //initially tbody will be empty
    tbody.innerHTML="";
    let passingStudents = data.filter(student => student.Passing);
    ShowData(passingStudents);
}

//sort by class
function sortByClass()
{
    //initially tbody will be empty
    tbody.innerHTML="";
    let sortedByClassAsc = data.slice().sort((a, b) => a.Class - b.Class);
    ShowData(sortedByClassAsc);
}

//sort by gender

function sortByGender()
{
    //initially tbody will be empty
    tbody.innerHTML="";
    let femaleStudents = data.filter(student => student.Gender === 'Female');
    let maleStudents = data.filter(student => student.Gender === 'Male');
    // to store other gender students which is neihther male or female
    let otherGenderStudents = data.filter(student => student.Gender!== 'Female' && student.Gender!== 'Male');
    ShowGenderData(maleStudents,maleStudents[0].Gender);
    ShowGenderData(femaleStudents,femaleStudents[0].Gender);
    ShowGenderData(otherGenderStudents,"Other Genders");
}

function ShowGenderData(data,gender)
{
        //first column will be a heading of table
    let row=tbody.insertRow();
    let td=row.insertCell();
    td.innerHTML=gender;
    td.className="genderHeading";
        //we will add col span of 7 col in td
    td.colSpan=7;
    row.append(td);
    //initially tbody will be empty
    for(let i=0;i<data.length;i++)
    {
        let row=tbody.insertRow();
        for(let j=0;j<theadData.length;j++)
        {
            let td=document.createElement("td");
            if(theadData[j]=="Name")
            {
                td.innerHTML=`<img height=30px src="${data[i].img}"> ${data[i][theadData[j]]}`;
            }
            else if(theadData[j]=="Passing")
            {
                if(data[i][theadData[j]]) td.innerHTML=`passing`;
                else td.innerHTML=`failed`;
            }
            else{
                td.innerHTML=data[i][theadData[j]];
            }

            td.className=theadData[j];
            row.append(td);
        }
    }
}

// search functinality
//* Implement a search bar to filter table data based on first name, 
// last name, and email. The search should be case insensitive and can be triggered by 
// either typing in the search bar or clicking a search button.

let searchBar=document.querySelector("#searchBar");
let searchBtn=document.querySelector("#searchBtn");

function search(){
    //initially tbody will be empty
    tbody.innerHTML="";
    let searchedStudents = data.filter(student => student.firstName.toLowerCase().includes(searchBar.value.toLowerCase()) || 
                                       student.lastName.toLowerCase().includes(searchBar.value.toLowerCase()) || 
                                       student.Email.toLowerCase().includes(searchBar.value.toLowerCase()));
    ShowData(searchedStudents);
}