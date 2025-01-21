const baseUrl = "http://localhost:5143/api/Chair";

Vue.createApp({
    data() {
        return {
            chairs: [],
            deleteId: 0,
            deleteMessage: "", 
            addData: { modelen: "", maxWeight: 0, hasPillow: false },
            addMessage: ""
        };
    },
    methods: {
        async getChairs(url) {
            try {
                const response = await axios.get(url);
                this.chairs = response.data;
            } catch (ex) {
                alert(ex.message);
            }
        },
        getAllChair() {
            this.getChairs(baseUrl);
        },
        async addChair() {
            try {
                const response = await axios.post(baseUrl, this.addData);
                this.addMessage = "response " + response.status + " " + response.statusText;
                this.getAllChair();
            } catch (ex) {
                alert(ex.message);
            }
        },
        async deleteChair(deleteId) {
            const url = `${baseUrl}/${deleteId}`;
            try {
                const response = await axios.delete(url);
                this.deleteMessage = response.status + " " + response.statusText;
                this.getAllChair();
            } catch (ex) {
                alert(ex.message);
            }
        }
    },
    async mounted() {
        await this.getAllChair();
    }
}).mount("#app");