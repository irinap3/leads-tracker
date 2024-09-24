let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if(leadsFromLocalStorage){
   myLeads = leadsFromLocalStorage ;
   render(myLeads);
}

tabBtn.addEventListener("click", function(){
   chrome.tabs.query({active: true, currentWindow: true }, function (tabs) {
      myLeads.push(tabs[0].url);
      localStorage.setItem("myLeads",JSON.stringify(myLeads));
      render(myLeads);
   })
})

function render(leads){
   let listItems = "";
   for(let i = 0; i < leads.length; i++){
   /* first method to render leads but it costs more
   const li = document.createElement("li"); //creating html tags
   li.textContent = myLeads[i]; //set the text content
   ulEl.append(li);  //appending it to the ul element
   */

  /* second method but hard readable to humans
  listItems += "<li><a target = '_blank' href = '" + myLeads[i] + "'>" + myLeads[i] + "</a></li>";
  */
  
  //third method that use template strings - readable to humans and small cost of time
  listItems += `
   <li>
       <a target = '_blank' href = '${leads[i]}'> 
         ${leads[i]}
       </a>
   </li>
  `
}
ulEl.innerHTML = listItems;
}

deleteBtn.addEventListener("click", function(){
   localStorage.clear();
   myLeads = [];
   render(myLeads);
});

inputBtn.addEventListener("click",function(){
   myLeads.push(inputEl.value);
   inputEl.value = "";
   localStorage.setItem("myLeads",JSON.stringify(myLeads));
   render(myLeads);
});