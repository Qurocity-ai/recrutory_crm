import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CilentService {

  url = "https://main.recrutory-apis.com:4000"
  // url = "https://recrutory-crm-backend-amsk.onrender.com"
  
  //  url = "http://localhost:4000"

  constructor(private http: HttpClient) { }

  //client services starts from here
  getAllClient() {
    return this.http.get(`${this.url}/api/client/clients`);
  }

  addClient(data: any) {
    return this.http.post(`${this.url}/api/client/clients`, data);
  }

  updateClientById(clientId: any, data: any) {
    return this.http.put(`${this.url}/api/client/clients/${clientId}`, data)
  }

  deleteClient(clientId: any) {
    return this.http.delete(`${this.url}/api/client/clients/${clientId}`);
  }

  // process services starts from here
  getAllProcess() {
    return this.http.get(`${this.url}/api/client/clients/processes`);
  }

  getClientById(clientId: any) {
    return this.http.get(`${this.url}/api/client/clients/${clientId}`);
  }

  getProcessById(clientId: any, processId: any) {
    return this.http.get(`${this.url}/api/client/clients/${clientId}/process/${processId}`);
  }

  addProcess(clientId: any, data: any) {
    return this.http.post(`${this.url}/api/client/clients/${clientId}/process/`, data);
  }

  updateProcess(clientId: any, processId: any, data: any) {
    return this.http.put(`${this.url}/api/client/clients/${clientId}/processes/${processId}`, data);
  }

  deleteProcess(clientId: any, processId: any) {
    return this.http.delete(`${this.url}/api/client/clients/${clientId}/process/${processId}`);
  }

  // get Recruiter using role
  getRecruiter(data:any){
    return this.http.get(`${this.url}/api/users-by-role?role=${data}`);
  }

  // updating recruiter in filtersheet by passing array of candidate
  updateMultipleRecruiter(clientId: any, processId: any,data: any) {
    return this.http.put(`${this.url}/api/client/clients/assign-recruiter/${clientId}/${processId}`, data);
  }

  // updating candidate in filtered table which also reflect in mastersheet
  updateFilteredCandidate(clientId: any, processId: any, candidateId: any, data: any){

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put(`${this.url}/api/client/clients/${clientId}/processes/${processId}/candidates/${candidateId}`,data, {headers});
  } 

  // delete candidate from filtered sheet
  deleteFilteredCandidate(clientId: any,processId: any,candidateId: any){
    return this.http.delete(`${this.url}/api/client/clients/${clientId}/process/${processId}/candidates/${candidateId}`);
  }

  // get for selected candidate sheet
  getSelectCandidate(){
    return this.http.get(`${this.url}/api/client/selected-candidates`);
  }

  // filter for lang and prof in filter sheet
  filteredSheetFilter(clientId: any, processId: any, lang: any, proficiencyLevels: any, exp: any) {
    // Construct the URL path using route parameters
    let url = `${this.url}/api/client/filteredCandidatesFilter`;
  
    // Append the parameters in the URL path
    if (clientId && processId && lang && proficiencyLevels && exp) {
      url += `/${clientId}/${processId}/${lang}/${proficiencyLevels}/${exp}`;
    } else if (clientId && processId && lang && proficiencyLevels) {
      url += `/${clientId}/${processId}/${lang}/${proficiencyLevels}/`;
    } else if (clientId && processId && lang) {
      url += `/${clientId}/${processId}/${lang}/`;
    } else if (clientId && processId) {
      url += `/${clientId}/${processId}/`;
    } else if (clientId) {
      url += `/${clientId}/`;
    }
  
    // Make HTTP GET request
    return this.http.get(url);
  }
  
  // filteredSheetFilter(clientId: any, processId: any, lang: any, proficiencyLevels: any, exp: any){

  //   let params: any = {};

  //   if(clientId){
  //     params.clientId = clientId
  //   }

  //   if(processId){
  //     params.processId = processId
  //   }

  //   if(lang){
  //     params.lang = lang
  //   }

  //   if(proficiencyLevels){
  //     params.proficiencyLevels = proficiencyLevels
  //   }

  //   if(exp){
  //     params.exp = exp
  //   }

  //   return this.http.get(`${this.url}/api/client/filteredCandidatesFilter`)

  // }

  // filterSheetlangFilter(clientId: any,processId: any,lang: any,proficiencyLevels: any){
  //   if(lang && !proficiencyLevels){
  //     return this.http.get(`${this.url}/api/client/clients/${clientId}/process/${processId}/filterLangFilter?lang=${lang}`);
  //   }
  //   else if(!lang && proficiencyLevels){
  //     return this.http.get(`${this.url}/api/client/clients/${clientId}/process/${processId}/filterLangFilter?proficiencyLevel=${proficiencyLevels}`);
  //   }
  //   else{
  //     return this.http.get(`${this.url}/api/client/clients/${clientId}/process/${processId}/filterLangFilter?lang=${lang}&proficiencyLevel=${proficiencyLevels}`);
  //   }
  // }

  // filter for lang and prof in interested candidate
  interestedlangFilter(clientId: any,processId: any,lang:any,proficiencyLevels: any){
    if(lang && !proficiencyLevels){
      return this.http.get(`${this.url}/api/client/clients/${clientId}/process/${processId}/interestedlangfilter?lang=${lang}`);
    }
    else if(!lang && proficiencyLevels){
      return this.http.get(`${this.url}/api/client/clients/${clientId}/process/${processId}/interestedlangfilter?proficiencyLevel=${proficiencyLevels}`);
    }
    else{
      return this.http.get(`${this.url}/api/client/clients/${clientId}/process/${processId}/interestedlangfilter?lang=${lang}&proficiencyLevel=${proficiencyLevels}`);
    }
  }

  // filter for lan and prof in selected sheet
  filterSelectedSheet(lang: any,proficiencyLevels: any){
    if(lang && !proficiencyLevels){
      return this.http.get(`${this.url}/api/client/selectedFilter?lang=${lang}`);
    }
    else if(!lang && proficiencyLevels){
      return this.http.get(`${this.url}/api/client/selectedFilter?proficiencyLevel=${proficiencyLevels}`);
    }
    else{
      return this.http.get(`${this.url}/api/client/selectedFilter?lang=${lang}&proficiencyLevel=${proficiencyLevels}`);
    }
  }

}
