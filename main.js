document.getElementById('issueInputForm').addEventListener('submit', submitIssue);
function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
}

const closeIssue = (id,event)=> {
  event.preventDefault();
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id == id);
  currentIssue.status="Close"
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

const deleteIssue = (id,event)=> {
  event.preventDefault();
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter( issue=>issue.id!=id )
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  fetchIssues();
}


// ActiveIssue();
const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    const {id, description, severity, assignedTo, status} = issues[i];
    issuesList.innerHTML +=   `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3><span  id="description${id}"><i class="fas fa-check-circle"></i></span> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="closeIssue(${id},event)" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${id},event)" class="btn btn-danger">Delete</a>
                              </div>`;                    
  }
  ActiveStatus();
  TotalIssue();
  ActiveIssue();
}

const ActiveStatus=()=>{
const issues=JSON.parse(localStorage.getItem('issues'));
  for (let i = 0; i < issues.length; i++) {
    const {id} = issues[i];
    if(issues[i].status==="Close")
    {
      document.getElementById(`description${id}`).innerHTML=`<i class="fas fa-times-circle"></i>`;
      document.getElementById(`description${id}`).style.backgroundColor='red';
    }
    
  }
}
const TotalIssue=()=>{
  const issues=JSON.parse(localStorage.getItem('issues'))||[];
  document.getElementById('TotalIssue').innerText=issues.length;
}

const ActiveIssue=()=>{
  const issues=JSON.parse(localStorage.getItem('issues'))||[];
  let Active=0;
  issues.forEach(element => {
    if(element.status==="Open")
    {
      Active+=1;
    }
  });
  
  document.getElementById('ActiveIssue').innerText=Active;
}
