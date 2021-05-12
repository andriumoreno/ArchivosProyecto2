package lib

type User struct {
	Name     string `json:"name"`
	Password string `json:"password"`
}

type NewUser struct {
	Fristname string `json:"fristname"`
	Lastname  string `json:"lastname"`
	Email     string `json:"email"`
	Password  string `json:"password"`
	Birthday  string `json:"birthday"`
}

type UserD struct {
	Fristname string `json:"fristname"`
	Lastname  string `json:"lastname"`
	Email     string `json:"email"`
	Birthday  string `json:"birthday"`
}

type UserUpdate struct {
	Fristname string `json:"fristname"`
	Lastname  string `json:"lastname"`
	Email     string `json:"email"`
	Password  string `json:"password"`
}

type Event struct {
	HomeTeam  string `json:"hometeam"`
	VisitTeam string `json:"visitteam"`
	Start     string `json:"start"`
	End       string `json:"end"`
	Id_sport  string `json:"idsport"`
	Color     string `json:"backgroundColor"`
}

type EventResult struct {
	IdEvent     string `json:"id"`
	HomeResult  string `json:"resulth"`
	VisitResult string `json:"resultv"`
}

type Season struct {
	SeasonName string `json:"seasonname"`
	StartDate  string `json:"startdate"`
	EndDate    string `json:"enddate"`
}

type EndSeason struct {
	EndDate string `json:"enddate"`
}

type Week struct {
	NameWeek   string `json:"nameWeek"`
	StartDate  string `json:"weekstart"`
	EndDate    string `json:"weekend"`
	WeekStatus string `json:"weekstatus"`
	IdSeason   string `json:"idseason"`
}

type EndWeek struct {
	EndDate string `json:"enddate"`
	Status  string `json:"status"`
}

type Sport struct {
	Name  string `json:"sportname"`
	Color string `json:"sportcolor"`
}

type Sports struct {
	IdSports string `json:"idsport"`
	Name     string `json:"name"`
	Color    string `json:"color"`
}

type Bet struct {
	HomeResult  string `json:"resultH"`
	VisitResult string `json:"resultV"`
	IdUser      string `json:"id"`
	IdEvent     string `json:"idevent"`
}

type SeasonData struct {
	SeasonName string `json:"seasonname"`
	SeasonId   string `json:"seasonid"`
}

type Events struct {
	Title           string `json:"title"`
	Start           string `json:"start"`
	End             string `json:"end"`
	Id              string `json:"id"`
	BackgroundColor string `json:"backgroundColor"`
}

type Bets struct {
	Evento     string `json:"event"`
	Pronostico string `json:"pronos"`
	Resultado  string `json:"result"`
}
