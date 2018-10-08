/**
 * Created by Administrator on 2015-09-27.
 */
define([],function(){
    function formatDate(d){
        if(!d){
            return "";
        }
        if(typeof(d) != 'object'){
            d = new Date(d);
        }
        var fullYear = d.getFullYear();
        var month = (d.getMonth()+1);
        if(month < 10){
            month = "0" + month;
        }
        else{
            month = "" + month;
        }
        var date = d.getDate();
        if(date < 10){
            date = "0" + date;
        }
        else{
            date = "" + date;
        }

        var hours = d.getHours();
        if(hours < 10){
            hours = "0" + hours;
        }
        else{
            hours = "" + hours;
        }

        var minutes = d.getMinutes();
        if(minutes < 10){
            minutes = "0" + minutes;
        }
        else{
            minutes = "" + minutes;
        }

        var seconds = d.getSeconds();
        if(seconds < 10){
            seconds = "0" + seconds;
        }
        else{
            seconds = "" + seconds;
        }
        return fullYear + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    }
    return  {
        formatDate : formatDate
    }
});
