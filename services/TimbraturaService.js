import http from "../http-common";

class TimbraturaDataService {
  getAll() {
    return http.get("/timbratura");
  }

  get(id) {
    return http.get(`/timbratura/${id}`);
  }

  create(data){
      return http.post("/timbratura",data);
  }

  update (id,data){
      return http.put(`/timbratura/${id}`,data);
  }

  delete (id){
      return http.delete(`/timbratura/${id}`);
  }
}

export default new TimbraturaDataService();