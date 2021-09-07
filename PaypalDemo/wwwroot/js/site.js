﻿// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

let sendPaypal = document.querySelector('.send-btn');

function setPaypal() {
    var args = {
    };
    setTimeout(function () {
        $.ajax({
            type: "get",
            url: "/home/paypalOrderID",
            dataType: "json",
            data: args,
            success: function (result) {
                console.log(result)
            },
            error: function () {
                console.log('error')
            }
        });
    }, 1000);
}
if (sendPaypal) {
    sendPaypal.addEventListener('click', setPaypal);
}

paypal.Buttons({
    createOrder: function (data, actions) {
        // This function sets up the details of the transaction, including the amount and line item details.
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: $('#price').val(),
                }
            }]
        });
    },
    onApprove: function (data, actions) {
        console.log(data);
        console.log(actions);
        setTimeout(function () {
            $.ajax({
                type: "post",
                url: "home/paypal",
                dataType: "json",
                data: data,
                success: function (result) {
                    console.log(result)
                },
                error: function () {
                    console.log('error')
                }
            });
        }, 1000);
        // This function captures the funds from the transaction.
        return actions.order.capture().then(function (details) {
            // This function shows a transaction success message to your buyer.
            alert('Transaction completed by ' + details.payer.name.given_name);
        });
    }
}).render('#paypal-button-container');

let sendPaypal2 = document.querySelector('.btntest');

function setPaypal2() {
    $.ajax({
        type: "get",
        url: "/home/paypalapproval",
        dataType: "json",
        success: function (result) {
            console.log(result);
            window.open(result.rel);
        },
        error: function () {
            console.log('error')
        }
    });
}
sendPaypal2.addEventListener('click', setPaypal2);

let sendPaypal3 = document.querySelector('.btnss');

function setPaypal3() {
    $.ajax({
        type: "get",
        url: "/home/paypaltopup",
        dataType: "json",
        success: function (result) {
            console.log(result);
            window.open(result.rel);
        },
        error: function () {
            console.log('error')
        }
    });
}
sendPaypal3.addEventListener('click', setPaypal3);