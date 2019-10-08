var Url = 'http://murmuring-hollows-00857.herokuapp.com/api/v1/'
//var Url = 'http://localhost:3000/api/v1/'
new Vue({
    el: '#main',
    created: function() {
        this.getMovies();
    },
    data: {
        movies: [],
        date_start: "",
        date_end: "",
        fillmovie: {'id': '', 'name': '', 'description': '', 'url_image':'', 'created_at': ''},
        name: "",
        url_image: "",
        description: "",
        reservation_state: "",
        nameReservation: "",
        document: "",
        email: "",
        movies_id: "",
        reservations: []
    },
    methods: {
        getMovies: function() {
            var urlMovies =  Url + '/movies';
            axios.get(urlMovies).then(response => {
                this.movies = response.data
            });
        },
        searchMovie: function(){
            this.date_start = document.querySelector("input[id=datepicker1]").value
            this.date_end = document.querySelector("input[id=datepicker2]").value
            var urlMovies = Url + '/movies';
            axios.get(urlMovies, {
                params: {
                    start_date: this.date_start,
                    end_date: this.date_end
                }
              }).then(response => {
                this.movies = response.data
            }).catch(e => {
                console.log(e);
            })
        },
        viewMovie: function(movie){
            var urlViewMovie = Url + "/movies/" + movie.id ;
            axios.get(urlViewMovie).then(response => {
               this.fillmovie.id = movie.id
               this.fillmovie.name = movie.name
               this.fillmovie.description = movie.description
               this.fillmovie.url_image = movie.url_image
               this.fillmovie.created_at = movie.created_at
               $("#viewMovie").modal("show")
            });
        },
        createMovie: function(){
            var urlCreateMovie = Url + "movies"
            axios.post(urlCreateMovie, {
                name: this.name,
                url_image: this.url_image,
                description: this.description
            }).then(response => {
                this.getMovies()
                this.name = ""
                this.url_image = ""
                this.description = ""
                $("#createMovie").modal("hide")
                toastr.success("Agregado Correctamente.")
            }).catch(error => {
                console.log(error);
            })
        },


        validateReservation: function(movie){
            var urlValidate = Url + 'validate/' + movie.id;
            axios.get(urlValidate).then(response => {
                this.reservation_state = response.data.state
                this.movies_id = movie.id
                $("#createReservation").modal("show")
            });
        },

        createReservation: function(id){
            var urlCreateReservation = Url + "stockpiles"
            axios.post(urlCreateReservation, {
                name: this.nameReservation,
                document: this.document,
                email: this.email,
                movies_id: id
            }).then(response => {
                this.name = ""
                this.document = ""
                this.email = ""
                this.movie_id = ""
                $("#createReservation").modal("hide")
                toastr.success("Agregado Correctamente.")
            }).catch(error => {
                console.log(error);
            })
        },
        viewReservations: function(){
            var urlViewReservations = Url + "/stockpiles/";
            axios.get(urlViewReservations).then(response => {
                this.reservations = response.data
            });

            $("#viewReservations").modal("show")
        }
    }
});