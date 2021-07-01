var obj = new Vue({
    el: '#VueApp',
    data: {
        message: 'Hello Vue!',
        buy_price: '',
        sell_price: '',
        investment: '',
        profit: 'Press button!',
        profit_percentage: 'Press button!',
        asset1: ['Asset 1', 0, 0],
        asset2: ['Asset 2', 0, 0],
        asset3: ['Asset 3', 0, 0],
        asset4: ['Asset 4', 0, 0],
        investment_amount: '',
        best_investment: 'press button!',
        list_buy: [],
        list_sell: [],
        avg_price: 'Press button!',
        temp1: '0',
        temp2: '0',
        temp3: '0',
        temp4: '0',
    },
    methods: {
        get_profit: function(event) {
            if (obj.buy_price == 0) {
                alert('Please enter buying price, selling price, and investment amount!')
                return;
            }

            if (isNaN(obj.buy_price) || isNaN(obj.sell_price) || isNaN(obj.investment)) {
                alert('Please enter only numbers in the input field!')
                return;
            }
            obj.profit = obj.sell_price * obj.investment / obj.buy_price - obj.investment;
            obj.profit_percentage = String(obj.profit * 100 / obj.investment) + "%";
        },

        investment_finder: function(event) {
            var prof1 = getProfit(obj.asset1[1], obj.asset1[2], obj.investment_amount);
            var prof2 = getProfit(obj.asset2[1], obj.asset2[2], obj.investment_amount);
            var prof3 = getProfit(obj.asset3[1], obj.asset3[2], obj.investment_amount);
            var prof4 = getProfit(obj.asset4[1], obj.asset4[2], obj.investment_amount);
            var max = Math.max(prof1, prof2, prof3, prof4);
            if (prof1 == max) {
                obj.best_investment = obj.asset1[0];
            }
            if (prof2 == max) {
                obj.best_investment = obj.asset2[0];
            }
            if (prof3 == max) {
                obj.best_investment = obj.asset3[0];
            }
            if (prof4 == max) {
                obj.best_investment = obj.asset4[0];
            }
        },

        append_buy: function(event) {
            obj.list_buy.push([obj.temp1, obj.temp2, obj.list_buy.length]);
        },

        append_sell: function(event) {
            obj.list_sell.push([obj.temp3, obj.temp4, obj.list_sell.length]);
        },

        calculate_avg: function(event) {
            var price = 0;
            var units = 0;
            for (let i = 0; i < obj.list_buy.length; i++) {
                var unit = obj.list_buy[i][0];
                price += unit[0] * unit[1];
                units += unit[1];
            }
            for (let i = 0; i < obj.list_sell.length; i++) {
                var unit = obj.list_sell[i];
                price -= unit[0] * unit[1];
                units -= unit[1];
            }
            obj.avg_price = String(price / units) + " price:" + String(price) + "units: " + String(units);
        },

        remove_buy: function(id) {
            var temp = [];
            for (let i = 0; i < obj.list_buy.length; i++) {
                if (i != id) {
                    temp.push([obj.list_buy[i][0], obj.list_buy[i][1], i])
                }
            }
            obj.list_buy = temp;
            delete temp;
        },

        remove_sell: function(id) {
            var temp = [];
            for (let i = 0; i < obj.list_sell.length; i++) {
                if (i != id) {
                    temp.push([obj.list_sell[i][0], obj.list_sell[i][1], i])
                }
            }
            obj.list_sell = temp;
            delete temp;
        },
    }
})

function getProfit(buy, sell, invest) {
    if (isNaN(buy) || isNaN(sell) || isNaN(invest)) {
        alert('Please enter only numbers!')
        return 0;
    }
    return sell * invest / buy - invest;
}