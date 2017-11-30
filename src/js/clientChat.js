let app = new Vue({
    el: '#app',
    data: {
        message: 'Hello'
    },
    methods: {
        userSubmitChat: () => {
            this.message = '!'
        }
    }
});


function sendMessage() {}
