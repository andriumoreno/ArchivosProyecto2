package lib

import (
	"database/sql"
	"fmt"

	godror "github.com/godror/godror"
)

var db *sql.DB

func Connection() {
	database, err := sql.Open("godror" /*dsn*/, `user="Ivan" password="1234" connectString="localhost:1521/ORCL18" libDir=\Users\Asus\Downloads\instantclient_19_10`)
	if err != nil {
		panic(err)
	}
	db = database
	print("ok\n")
	Consulta()
}

func Consulta() {
	q := `select iduser, fristname from "usuario"`
	var (
		id   uint
		name string
	)
	rows, err := db.Query(q, godror.PrefetchCount(1000), godror.FetchArraySize(1000))
	if err != nil {
		panic(err)
	}
	defer rows.Close()
	for rows.Next() {
		err := rows.Scan(&id, &name)
		if err != nil {
			panic(err)
		}
		fmt.Println(id, name)
	}
	err = rows.Err()
	if err != nil {
		panic(err)
	}
}

func Login(correo string, password string) uint32 {
	q := `select iduser from "usuario" where email=:email and contrasena=:contrasena`
	var id uint32 = 0
	row := db.QueryRow(q, correo, password)
	err := row.Scan(&id)
	if err != nil && err != sql.ErrNoRows {
		panic(err)
	}
	return id
}

func RegistUser(nombre string, apellido string, correo string, password, nacimiento string, hoy string) uint32 {
	query := `INSERT INTO "usuario"(fristname, lastname, email, contrasena, birthday, rdate)
			  VALUES (:val1, :val2, :val3, :val4, :val5, :val6)`
	res, err := db.Exec(query, nombre, apellido, correo, password, nacimiento, hoy)
	if err != nil {
		panic(err)
	}
	numAffect, err := res.RowsAffected()
	if err != nil {
		panic(err)
	}
	print(numAffect)
	return uint32(numAffect)
}

func GetUserData(id string) UserData {
	q := `select fristname, lastname, email, birthday from "usuario" where idUser=:id `
	row := db.QueryRow(q, id)
	var usr UserData
	err := row.Scan(&usr.Fristname, &usr.Lastname, &usr.Email, &usr.Birthday)
	if err != nil && err != sql.ErrNoRows {
		fmt.Println(err)
	}
	fmt.Println("the name is" + usr.Fristname + " " + usr.Lastname)
	return usr
}

func UpdateUser(id string, user UserUpdate) uint32 {
	query := `UPDATE "usuario" SET fristname=:val1, lastname=:val2, email=:val3, contrasena=:val4 where iduser=:val5`
	res, err := db.Exec(query, user.Fristname, user.Lastname, user.Email, user.Password, id)
	if err != nil {
		panic(err)
	}
	numAffect, err := res.RowsAffected()
	if err != nil {
		panic(err)
	}
	print(numAffect)
	return uint32(numAffect)
}

func CreateEvent(event Event) uint32 {
	query := `INSERT INTO "event"(fechaInicio, fechaFin,homeTeam,visitTeam,id_sport,color,rHome,rVisit)
			  VALUES (:val1, :val2, :val3,:val4,:val5,:val6,0,0)`
	res, err := db.Exec(query, event.Start, event.End, event.HomeTeam, event.VisitTeam, event.Id_sport, event.Color)
	if err != nil {
		panic(err)
	}
	numAffect, err := res.RowsAffected()
	if err != nil {
		panic(err)
	}
	print(numAffect)
	return uint32(numAffect)
}

func UpdateEvent(event EventResult) uint32 {
	query := `UPDATE "event" SET rHome=:val1, rVisit=:val2 where idEvent=:val3`
	fmt.Println(event.HomeResult)
	res, err := db.Exec(query, event.HomeResult, event.VisitResult, event.IdEvent)
	if err != nil {
		panic(err)
	}
	numAffect, err := res.RowsAffected()
	if err != nil {
		panic(err)
	}
	print(numAffect)
	return uint32(numAffect)
}

func CreateSeason(season Season) uint32 {
	query := `INSERT INTO "season"(seasonName, seasonStart, seasonFinish)
			  VALUES (:val1, :val2, :val3)`
	res, err := db.Exec(query, season.SeasonName, season.StartDate, season.EndDate)
	if err != nil {
		panic(err)
	}
	numAffect, err := res.RowsAffected()
	if err != nil {
		panic(err)
	}
	print(numAffect)
	return uint32(numAffect)
}

func UpdateSeason(id string, date EndSeason) {

}

func GetLatestSeason() SeasonData {
	q := `SELECT idseason, seasonname FROM "season" where idseason=( Select MAX(idseason)from "season")`
	var sData SeasonData
	row := db.QueryRow(q)
	err := row.Scan(&sData.SeasonId, &sData.SeasonName)
	if err != nil && err != sql.ErrNoRows {
		panic(err)
	}
	return sData
}

func CreateWeek(week Week) uint32 {
	query := `INSERT INTO "sportWeek"(weekname, weekstart,weeekfinish,status,id_season)
			  VALUES (:val1, :val2, :val3,:val4,:val5)`
	res, err := db.Exec(query, week.NameWeek, week.StartDate, week.EndDate, week.WeekStatus, week.IdSeason)
	if err != nil {
		panic(err)
	}
	numAffect, err := res.RowsAffected()
	if err != nil {
		panic(err)
	}
	print(numAffect)
	return uint32(numAffect)
}

func UpdateWeek(id string, date EndWeek) {

}

func CreateSport(sport Sport) uint32 {
	query := `INSERT INTO "sport"(sportname, color)
			  VALUES (:val1, :val2)`
	res, err := db.Exec(query, sport.Name, sport.Color)
	if err != nil {
		panic(err)
	}
	numAffect, err := res.RowsAffected()
	if err != nil {
		panic(err)
	}
	print(numAffect)
	return uint32(numAffect)
}

func GetSports() []Sports {
	var lista []Sports
	q := `select idSport, sportName, color from "sport"`

	rows, err := db.Query(q, godror.PrefetchCount(1000), godror.FetchArraySize(1000))
	if err != nil {
		panic(err)
	}
	defer rows.Close()
	for rows.Next() {
		var aux Sports
		err := rows.Scan(&aux.IdSports, &aux.Name, &aux.Color)
		if err != nil {
			panic(err)
		}
		lista = append(lista, aux)
	}
	err = rows.Err()
	if err != nil {
		panic(err)
	}

	return lista
}

func UpdateSport(id string, sport Sport) uint32 {
	query := `UPDATE "sport" SET sportname=:val1, color=:val2 where idsport=:val3`
	res, err := db.Exec(query, sport.Name, sport.Color, id)
	if err != nil {
		panic(err)
	}
	numAffect, err := res.RowsAffected()
	if err != nil {
		panic(err)
	}
	print(numAffect)
	return uint32(numAffect)
}

func DeleteSport(id string) uint32 {
	query := `DELETE FROM "sport" where idsport=:val1`
	res, err := db.Exec(query, id)
	if err != nil {
		panic(err)
	}
	numAffect, err := res.RowsAffected()
	if err != nil {
		panic(err)
	}
	fmt.Println(numAffect)
	return uint32(numAffect)
}

func CreateBet(bet Bet) uint32 {
	query := `INSERT INTO "bet"(predictionHome, predictionVisit,id_user,id_event)
			  VALUES (:val1, :val2, :val3, :val4)`
	fmt.Println(bet.IdEvent)
	res, err := db.Exec(query, bet.HomeResult, bet.VisitResult, bet.IdUser, bet.IdEvent)
	if err != nil {
		panic(err)
	}
	numAffect, err := res.RowsAffected()
	if err != nil {
		panic(err)
	}
	print(numAffect)
	return uint32(numAffect)
}

func GetBets(id string) []Bets {
	var lista []Bets
	q := `SELECT predictionHome, predictionVisit, rHome, rVisit,homeTeam, visitTeam from "event" inner join "bet" on id_event=idEvent where id_user=:val1`
	rows, err := db.Query(q, id, godror.PrefetchCount(1000), godror.FetchArraySize(1000))
	if err != nil {
		panic(err)
	}
	defer rows.Close()
	for rows.Next() {
		var aux Bets
		var home string
		var visit string
		var rHome uint32 = 0
		var rVisit uint32 = 0
		var pHome uint32 = 0
		var pVisit uint32 = 0
		err := rows.Scan(&pHome, &pVisit, &rHome, &rVisit, &home, &visit)
		if err != nil {
			panic(err)
		}
		aux.Evento = home + " vs " + visit
		aux.Pronostico = fmt.Sprint(pHome) + " - " + fmt.Sprint(pVisit)
		if rHome == 0 && rVisit == 0 {
			aux.Resultado = "Aun no hay resultados"
		} else {
			aux.Resultado = fmt.Sprint(rHome) + " - " + fmt.Sprint(rVisit)
		}
		lista = append(lista, aux)
	}
	err = rows.Err()
	if err != nil {
		panic(err)
	}

	return lista
}

func GetEvents() []Events {
	var lista []Events
	q := `select idEvent, fechaInicio, fechaFin, homeTeam, visitTeam, color, rHome, rVisit from "event"`

	rows, err := db.Query(q, godror.PrefetchCount(1000), godror.FetchArraySize(1000))
	if err != nil {
		panic(err)
	}
	defer rows.Close()
	for rows.Next() {
		var aux Events
		var home string
		var visit string
		var rHome uint32 = 0
		var rVisit uint32 = 0
		err := rows.Scan(&aux.Id, &aux.Start, &aux.End, &home, &visit, &aux.BackgroundColor, &rHome, &rVisit)
		if err != nil {
			panic(err)
		}
		aux.Title = getTitle(home, visit, rHome, rVisit)
		lista = append(lista, aux)
	}
	err = rows.Err()
	if err != nil {
		panic(err)
	}

	return lista
}

func getTitle(home string, visit string, rHome uint32, rVisit uint32) string {
	var title string
	if rHome == 0 && rVisit == 0 {
		title = home + " vs " + visit + " \n / - / "
	} else {
		title = home + " vs " + visit + " \n" + fmt.Sprint(rHome) + " - " + fmt.Sprint(rVisit)
	}
	return title
}

//--------------------------

type UserData struct {
	Fristname string
	Lastname  string
	Email     string
	Birthday  string
}
