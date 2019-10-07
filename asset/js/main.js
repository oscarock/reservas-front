new Vue({
    el: '#main',
    created: function() {
        this.getMovies();
    },
    data: {
        movies: []     
    },
    methods: {
        getMovies: function() {
            var urlMovies = 'http://murmuring-hollows-00857.herokuapp.com/api/v1/movies';
            axios.get(urlMovies).then(function(response){
                this.movies = response.data;
                console.log(response.data)
            });
        }
    }
});