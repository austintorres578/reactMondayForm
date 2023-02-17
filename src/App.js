
import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import Select from 'react-select';


function App() {


  //Enter api key
  let apiKey = ""

  let date = new Date()

  let month = date.getMonth()+1

  let currentMonth = () =>{
    if(date.getMonth().toString().length===1){
      return "0"+month.toString()
    }
    else{
      return date.getMonth().toString()
    }
  }

  let getDay = date.getDate()
  let fullYear = date.getFullYear()
  let currentDate = fullYear.toString()+"-"+currentMonth()+"-"+getDay.toString()

  let filledVariables




  const packages=[
    {value:'Basic',label:'Basic'},
    {value:'Intermediate',label:'Intermediate'},
    {value:'Premium',label:'Premium'}
  ]

  let getBoardQuery = '{ boards (limit:5) {name id} }';

  function getBoards(){
    fetch ("https://api.monday.com/v2", {
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
    'Authorization' : apiKey
   },
   body: JSON.stringify({
     'query' : getBoardQuery
   })
  })
   .then(res => res.json())


  }

function reusableFetch(api,query,variables){
  
  fetch (api, {
  method: 'post',
  headers: {
    'Content-Type': 'application/json',
    'Authorization' : apiKey
   },
   body: JSON.stringify({
     'query' : query,
     'variables':JSON.stringify(variables)
   })
  })
   .then(res => res.json())
   .then(res => console.log(JSON.stringify(res, null, 2)));

}
function submit(event){
  event.preventDefault()
// reusableFetch('https://api.monday.com/v2','mutation{ create_item (board_id:3977125012, item_name:\"WHAT IS UP MY FRIENDS!\") { id } }')


if(document.querySelector('.packages').children[2].children[0].children[0].innerHTML==="Select Package"){
  alert('Please select package')
}else{

let companyName = document.querySelector(".company-name-container").children[0].value;

filledVariables = {
  "myItemName" : `${companyName}`,
  "columnVals" : JSON.stringify({
    "status4" : {"label" : "Awaiting Development"},
    "date4" : {"date" : `${currentDate}`},
    "text3": `${document.querySelector('.packages').children[2].children[0].children[0].innerHTML}`,
    "text2": `${document.querySelector(".email-container").children[0].value}`,
    "text5":`${document.querySelector(".phone-number-container").children[0].value}`,
    "text0":`${document.querySelector(".website-container").children[0].value}`
  })
}





reusableFetch(`https://api.monday.com/v2`,'mutation ($myItemName: String!, $columnVals: JSON!) { create_item (board_id:3977125012, item_name:$myItemName, column_values:$columnVals) { id } }',filledVariables)

alert("Submit successful. Thank You!")
window.location.reload()
}
}



useEffect(()=>{
  getBoards()
},[])

  return (
    <div className="App">
        <div className='form-container'>
        <form onSubmit={submit}>
          <div className='form-name'>
            <h1>New Client Form</h1>
          </div>
            <h3>Input Information Below</h3>
          <div className='company-name-container'>
            <input type={'text'} placeholder='Company Name' required></input>
          </div>
          <div className='email-container'>
            <input type={'email'} placeholder='Email'></input>
          </div>
          <div className='phone-number-container'>
            <input type={'tel'} placeholder='Phone Number' required></input>
          </div>
          <div className='website-container'>
            <input type={'text'} placeholder='Website Address'></input>
          </div>
          <div className='packages-container'>
            <Select 
            className='packages'
            options={packages}
            placeholder='Select Package'
            required
            />
          </div>
          <div className='submit-container'>
            <button>Submit</button>
          </div>
          </form>
        </div>
    </div>
  );



}



export default App;
