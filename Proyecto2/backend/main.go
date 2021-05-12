package main

import (
	"backend/lib"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
)

var countSeason uint32 = 0
var countWeek uint32 = 0

func login(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	var usr lib.User
	_ = json.NewDecoder(r.Body).Decode(&usr)
	exist := lib.Login(usr.Name, usr.Password)
	if exist == 0 {
		w.Write([]byte("fail"))
		fmt.Println("fail")
	} else {
		str := fmt.Sprint(exist)
		w.Write([]byte(str))
		fmt.Println("ok")
	}
}

func insertUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	var usr lib.NewUser
	_ = json.NewDecoder(r.Body).Decode(&usr)
	creationdate := getdate()
	result := lib.RegistUser(usr.Fristname, usr.Lastname, usr.Email, usr.Password, usr.Birthday, creationdate)
	fmt.Println(result)
	w.Write([]byte("ok"))
}

func getUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	params := mux.Vars(r)
	var usr lib.UserData
	var res lib.UserD
	usr = lib.GetUserData(params["id"])
	res = lib.UserD(usr)
	json.NewEncoder(w).Encode(res)
}

func updateUserData(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	fmt.Println("update user")
	var usr lib.UserUpdate
	_ = json.NewDecoder(r.Body).Decode(&usr)
	params := mux.Vars(r)
	fmt.Println("# " + usr.Lastname)
	result := lib.UpdateUser(params["id"], usr)
	if result == 0 {
		w.Write([]byte("fail"))
	} else {
		w.Write([]byte("ok"))
	}
}

func createSport(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	var sport lib.Sport
	_ = json.NewDecoder(r.Body).Decode(&sport)
	fmt.Println(sport.Name + "  " + sport.Color)
	result := lib.CreateSport(sport)
	if result == 0 {
		w.Write([]byte("fail"))
	} else {
		w.Write([]byte("ok"))
	}
	fmt.Println(result)
}

func getSports(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	var lista = lib.GetSports()
	json.NewEncoder(w).Encode(lista)
}

func updateSport(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	var sport lib.Sport
	_ = json.NewDecoder(r.Body).Decode(&sport)
	params := mux.Vars(r)
	fmt.Println(sport.Name + "  " + sport.Color)
	result := lib.UpdateSport(params["id"], sport)
	if result == 0 {
		w.Write([]byte("fail"))
	} else {
		w.Write([]byte("ok"))
	}
	fmt.Println(result)
}

func deleteSport(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	params := mux.Vars(r)
	result := lib.DeleteSport(params["id"])
	if result == 0 {
		w.Write([]byte("fail"))
	} else {
		w.Write([]byte("ok"))
	}
	fmt.Println(result)
}

func createSeason(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	var season lib.Season
	_ = json.NewDecoder(r.Body).Decode(&season)
	season.SeasonName = season.SeasonName + fmt.Sprint(returnNumberSeason())
	fmt.Println(season.SeasonName)
	result := lib.CreateSeason(season)
	if result == 0 {
		w.Write([]byte("fail"))
	} else {
		w.Write([]byte(season.SeasonName))
	}
	fmt.Println(result)
}

func getLatestSeason(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	var sData = lib.GetLatestSeason()
	json.NewEncoder(w).Encode(sData)
}

func createWeek(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	var week lib.Week
	_ = json.NewDecoder(r.Body).Decode(&week)
	week.NameWeek = "J" + fmt.Sprint(returnNumberWeek())
	fmt.Println(week.NameWeek)
	result := lib.CreateWeek(week)
	if result == 0 {
		w.Write([]byte("fail"))
	} else {
		w.Write([]byte("ok"))
	}
	fmt.Println(result)
}

func getdate() string {
	today := time.Now()
	return today.Format("01-02-2006")
}

func createEvent(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	var event lib.Event
	_ = json.NewDecoder(r.Body).Decode(&event)
	result := lib.CreateEvent(event)
	if result == 0 {
		w.Write([]byte("fail"))
	} else {
		w.Write([]byte("ok"))
	}
	fmt.Println(result)
}

func createBet(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	var bet lib.Bet
	_ = json.NewDecoder(r.Body).Decode(&bet)
	result := lib.CreateBet(bet)
	if result == 0 {
		w.Write([]byte("fail"))
	} else {
		w.Write([]byte("ok"))
	}
	fmt.Println(result)
}

func getEvents(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	var lista = lib.GetEvents()
	json.NewEncoder(w).Encode(lista)
}

func updateEvent(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	var event lib.EventResult
	_ = json.NewDecoder(r.Body).Decode(&event)
	result := lib.UpdateEvent(event)
	if result == 0 {
		w.Write([]byte("fail"))
	} else {
		w.Write([]byte("Ok"))
	}
	fmt.Println(result)
}

func getBets(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	params := mux.Vars(r)
	var lista = lib.GetBets(params["id"])
	json.NewEncoder(w).Encode(lista)
}

func returnNumberSeason() uint32 {
	countSeason++
	return countSeason
}

func returnNumberWeek() uint32 {
	countWeek++
	return countWeek
}

func main() {
	r := mux.NewRouter()
	lib.Connection()

	r.HandleFunc("/userLogin", login).Methods("POST", "OPTIONS")
	r.HandleFunc("/newUser", insertUser).Methods("POST", "OPTIONS")
	r.HandleFunc("/getUser/{id}", getUser).Methods("GET", "OPTIONS")
	r.HandleFunc("/updateUser/{id}", updateUserData).Methods("POST", "OPTIONS")

	r.HandleFunc("/createSport", createSport).Methods("POST", "OPTIONS")
	r.HandleFunc("/getSport", getSports).Methods("GET", "OPTIONS")
	r.HandleFunc("/updateSport/{id}", updateSport).Methods("POST", "OPTIONS")
	r.HandleFunc("/deleteSport/{id}", deleteSport).Methods("POST", "OPTIONS")

	r.HandleFunc("/createSeason", createSeason).Methods("POST", "OPTIONS")
	r.HandleFunc("/getSeason", getLatestSeason).Methods("GET", "OPTIONS")

	r.HandleFunc("/createWeek", createWeek).Methods("POST", "OPTIONS")

	r.HandleFunc("/createEvent", createEvent).Methods("POST", "OPTIONS")
	r.HandleFunc("/getEvents", getEvents).Methods("GET", "OPTIONS")
	r.HandleFunc("/updateEvent", updateEvent).Methods("POST", "OPTIONS")

	r.HandleFunc("/createBet", createBet).Methods("POST", "OPTIONS")
	r.HandleFunc("/getBets/{id}", getBets).Methods("GET", "OPTIONS")

	log.Fatal(http.ListenAndServe(":8000", r))
}
