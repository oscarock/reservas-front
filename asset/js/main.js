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
        description: ""
    },
    methods: {
        getMovies: function() {
            var urlMovies = 'http://murmuring-hollows-00857.herokuapp.com/api/v1/movies';
            axios.get(urlMovies).then(response => {
                this.movies = response.data
            });
        },
        searchMovie: function(){
            this.date_start = document.querySelector("input[id=datepicker1]").value
            this.date_end = document.querySelector("input[id=datepicker2]").value
            var urlMovies = 'http://murmuring-hollows-00857.herokuapp.com/api/v1/movies';
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
            var urlViewMovie = "http://murmuring-hollows-00857.herokuapp.com/api/v1/movies/" + movie.id ;
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
            console.log("entre")
            var urlCreateMovie = "http://murmuring-hollows-00857.herokuapp.com/api/v1/movies"
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
        }
    }
});