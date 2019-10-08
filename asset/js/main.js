new Vue({
    el: '#main',
    created: function() {
        this.getMovies();
    },
    data: {
        movies: [],
        date_start: "",
        date_end: "",
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
                console.log(response.data)
            }).catch(e => {
                console.log(e);
            })
        }
    }
});