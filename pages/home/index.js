let jobsSelected = [];

function createCardJob(job){
    const {id, title, enterprise, location, descrition, modalities} = job;
    let cardJob = document.createElement("li");
    cardJob.classList = "card_job";
    let jobTitle = document.createElement("h3");
    jobTitle.classList = "title_4 color_grey_1";
    jobTitle.innerText = title;

    let containerText = document.createElement("div");
    containerText.classList = "container_text";

    let jobEnterprise = document.createElement("h4");
    jobEnterprise.classList = "text_3 color_grey_2"
    jobEnterprise.innerText = enterprise;
    let jobLocation = document.createElement("h4");
    jobLocation.classList = "text_3 color_grey_2";
    jobLocation.innerText = location;

    let jobDescrition = document.createElement("p");
    jobDescrition.classList = "text_2 color_grey_2";
    jobDescrition.innerText = descrition;

    let containerModalities = document.createElement("div");
    containerModalities.classList = "container_modalities";
    modalities.forEach((element)=>{
        let modality = document.createElement("h4");
        modality.classList = "text_3 color_grey2";
        modality.innerText = element;
        containerModalities.appendChild(modality);
    })    

    let applyButton = document.createElement("button");
    applyButton.classList = "button_big text_2";
    applyButton.innerText = "Candidatar"
    applyButton.id = id;
    applyButton.addEventListener("click", (event)=>{
        if(event.target.innerText === "Candidatar"){
            const jobSelected = jobsData.find(job=>job.id==event.target.id);
            jobsSelected.push(jobSelected);
            jobsDataJSON = JSON.stringify(jobsSelected);
            localStorage.setItem("jobsSelected",jobsDataJSON);
            document.getElementById("assideText").classList.add("none");
            listCardsJobsSelected(jobsSelected);
            event.target.innerText = "Remover candidatura";
        } else{
            jobsSelected.forEach((job,index)=>{
                if(event.target.id==job.id){
                    jobsSelected.splice(index,1);
                    jobsDataJSON = JSON.stringify(jobsSelected);
                    localStorage.setItem("jobsSelected",jobsDataJSON);
                }
            })
            if(jobsSelected.length===0){
                document.getElementById("assideText").classList.toggle("none");
            }
            listCardsJobsSelected(jobsSelected);
            event.target.innerText = "Candidatar";
        }
    })

    containerText.append(jobEnterprise,jobLocation);    
    cardJob.append(jobTitle, containerText, jobDescrition, containerModalities, applyButton);
    return cardJob;
}

function listCardsJobs(jobs){
    let jobsList = document.getElementById("jobsList");
    jobs.forEach(job=>{
        const cardJob = createCardJob(job);
        render(jobsList,cardJob);
    })
}
listCardsJobs(jobsData);

function createCardJobSelected(job){
    const {id, title, enterprise, location} = job;
    let cardJob = document.createElement("li");
    cardJob.classList = "card_job_select";
    let jobTitle = document.createElement("h3");
    jobTitle.classList = "title_4 color_grey_1";
    jobTitle.innerText = title;

    let containerText = document.createElement("div");
    containerText.classList = "container_text";

    let jobEnterprise = document.createElement("h4");
    jobEnterprise.classList = "text_3 color_grey_2"
    jobEnterprise.innerText = enterprise;
    let jobLocation = document.createElement("h4");
    jobLocation.classList = "text_3 color_grey_2";
    jobLocation.innerText = location;

    let deleteButton = document.createElement("button");
    deleteButton.classList = "button_delete";
    deleteButton.id = id;
    deleteButton.innerHTML = `<img src="../../assets/img/trash.png" alt="Excluir" id="${id}">`;
    deleteButton.addEventListener("click", event=>{        
        jobsSelected.forEach((job,index)=>{
            if(event.target.id==job.id){
                jobsSelected.splice(index,1);
                jobsDataJSON = JSON.stringify(jobsSelected);
                localStorage.setItem("jobsSelected",jobsDataJSON);
            }
        })
        console.log(event.target.id);
        if(jobsSelected.length===0){
            document.getElementById("assideText").classList.toggle("none");
        }
        listCardsJobsSelected(jobsSelected);       
        document.getElementById(event.target.id).innerText = "Candidatar";
    });

    containerText.append(jobEnterprise,jobLocation);    
    cardJob.append(jobTitle, containerText, deleteButton);
    return cardJob;
}

function listCardsJobsSelected(jobs){
    let jobsListSelected = document.getElementById("jobsListSelected");
    jobsListSelected.innerHTML = ``;
    jobs.forEach(job=>{
        const cardJob = createCardJobSelected(job);
        render(jobsListSelected,cardJob);
        if(document.getElementById(job.id).innerText === "Candidatar"){
            document.getElementById(job.id).innerText = "Remover Candidatura";
        }        
    })
}

function getLocalStorage() {
    const jobsDataJSON = localStorage.getItem('jobsSelected')
     
    if(jobsDataJSON) {
    jobsSelected = JSON.parse(jobsDataJSON) 

    if(jobsSelected.length!=0){
        document.getElementById("assideText").classList.add("none");
    }
    listCardsJobsSelected(jobsSelected);
    }
 }
getLocalStorage();

