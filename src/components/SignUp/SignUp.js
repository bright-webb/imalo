import React, { useState } from "react";
import { Message, Select, Button, Form, Label, Checkbox } from "semantic-ui-react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../templates/Header/Header";
import $ from 'jquery';
import "./SignUp.scss";

const countryOptions = [
  { key: "af", value: "af", flag: "af", text: "Afghanistan", phoneCode: "+93" },
  {
    key: "ax",
    value: "ax",
    flag: "ax",
    text: "Aland Islands",
    phoneCode: "+358",
  },
  { key: "al", value: "al", flag: "al", text: "Albania", phoneCode: "+355" },
  { key: "dz", value: "dz", flag: "dz", text: "Algeria", phoneCode: "+213" },
  {
    key: "as",
    value: "as",
    flag: "as",
    text: "American Samoa",
    phoneCode: "+1",
  },
  { key: "ad", value: "ad", flag: "ad", text: "Andorra", phoneCode: "+376" },
  { key: "ao", value: "ao", flag: "ao", text: "Angola", phoneCode: "+244" },
  { key: "ai", value: "ai", flag: "ai", text: "Anguilla", phoneCode: "+1" },
  {
    key: "ag",
    value: "ag",
    flag: "ag",
    text: "Antigua and Barbuda",
    phoneCode: "+1",
  },
  { key: "ar", value: "ar", flag: "ar", text: "Argentina", phoneCode: "+54" },
  { key: "am", value: "am", flag: "am", text: "Armenia", phoneCode: "+374" },
  { key: "aw", value: "aw", flag: "aw", text: "Aruba", phoneCode: "+297" },
  { key: "au", value: "au", flag: "au", text: "Australia", phoneCode: "+61" },
  { key: "at", value: "at", flag: "at", text: "Austria", phoneCode: "+43" },
  { key: "az", value: "az", flag: "az", text: "Azerbaijan", phoneCode: "+994" },
  { key: "bs", value: "bs", flag: "bs", text: "Bahamas", phoneCode: "+1" },
  { key: "bh", value: "bh", flag: "bh", text: "Bahrain", phoneCode: "+973" },
  { key: "bd", value: "bd", flag: "bd", text: "Bangladesh", phoneCode: "+880" },
  { key: "bb", value: "bb", flag: "bb", text: "Barbados", phoneCode: "+1" },
  { key: "by", value: "by", flag: "by", text: "Belarus", phoneCode: "+375" },
  { key: "be", value: "be", flag: "be", text: "Belgium", phoneCode: "+32" },
  { key: "bz", value: "bz", flag: "bz", text: "Belize", phoneCode: "+501" },
  { key: "bj", value: "bj", flag: "bj", text: "Benin", phoneCode: "+229" },
  { key: "bm", value: "bm", flag: "bm", text: "Bermuda", phoneCode: "+1" },
  { key: "bt", value: "bt", flag: "bt", text: "Bhutan", phoneCode: "+975" },
  { key: "bo", value: "bo", flag: "bo", text: "Bolivia", phoneCode: "+591" },
  {
    key: "ba",
    value: "ba",
    flag: "ba",
    text: "Bosnia and Herzegovina",
    phoneCode: "+387",
  },
  { key: "bw", value: "bw", flag: "bw", text: "Botswana", phoneCode: "+267" },
  { key: "br", value: "br", flag: "br", text: "Brazil", phoneCode: "+55" },
  {
    key: "vg",
    value: "vg",
    flag: "vg",
    text: "British Virgin Islands",
    phoneCode: "+1",
  },
  { key: "bn", value: "bn", flag: "bn", text: "Brunei", phoneCode: "+673" },
  { key: "bg", value: "bg", flag: "bg", text: "Bulgaria", phoneCode: "+359" },
  {
    key: "bf",
    value: "bf",
    flag: "bf",
    text: "Burkina Faso",
    phoneCode: "+226",
  },
  { key: "bi", value: "bi", flag: "bi", text: "Burundi", phoneCode: "+257" },
  { key: "kh", value: "kh", flag: "kh", text: "Cambodia", phoneCode: "+855" },
  { key: "cm", value: "cm", flag: "cm", text: "Cameroon", phoneCode: "+237" },
  { key: "ca", value: "ca", flag: "ca", text: "Canada", phoneCode: "+1" },
  { key: "cv", value: "cv", flag: "cv", text: "Cape Verde", phoneCode: "+238" },
  {
    key: "ky",
    value: "ky",
    flag: "ky",
    text: "Cayman Islands",
    phoneCode: "+1",
  },
  {
    key: "cf",
    value: "cf",
    flag: "cf",
    text: "Central African Republic",
    phoneCode: "+236",
  },
  { key: "td", value: "td", flag: "td", text: "Chad", phoneCode: "+235" },
  { key: "cl", value: "cl", flag: "cl", text: "Chile", phoneCode: "+56" },
  { key: "cn", value: "cn", flag: "cn", text: "China", phoneCode: "+86" },
  {
    key: "cx",
    value: "cx",
    flag: "cx",
    text: "Christmas Island",
    phoneCode: "+61",
  },
  {
    key: "cc",
    value: "cc",
    flag: "cc",
    text: "Cocos (Keeling) Islands",
    phoneCode: "+61",
  },
  { key: "co", value: "co", flag: "co", text: "Colombia", phoneCode: "+57" },
  { key: "km", value: "km", flag: "km", text: "Comoros", phoneCode: "+269" },
  {
    key: "ck",
    value: "ck",
    flag: "ck",
    text: "Cook Islands",
    phoneCode: "+682",
  },
  { key: "cr", value: "cr", flag: "cr", text: "Costa Rica", phoneCode: "+506" },
  {
    key: "ci",
    value: "ci",
    flag: "ci",
    text: "Côte d'Ivoire",
    phoneCode: "+225",
  },
  { key: "hr", value: "hr", flag: "hr", text: "Croatia", phoneCode: "+385" },
  { key: "cu", value: "cu", flag: "cu", text: "Cuba", phoneCode: "+53" },
  { key: "cw", value: "cw", flag: "cw", text: "Curaçao", phoneCode: "+599" },
  { key: "cy", value: "cy", flag: "cy", text: "Cyprus", phoneCode: "+357" },
  {
    key: "cz",
    value: "cz",
    flag: "cz",
    text: "Czech Republic",
    phoneCode: "+420",
  },
  {
    key: "cd",
    value: "cd",
    flag: "cd",
    text: "Democratic Republic of the Congo",
    phoneCode: "+243",
  },
  { key: "dk", value: "dk", flag: "dk", text: "Denmark", phoneCode: "+45" },
  { key: "dj", value: "dj", flag: "dj", text: "Djibouti", phoneCode: "+253" },
  { key: "dm", value: "dm", flag: "dm", text: "Dominica", phoneCode: "+1" },
  {
    key: "do",
    value: "do",
    flag: "do",
    text: "Dominican Republic",
    phoneCode: "+1",
  },
  { key: "tl", value: "tl", flag: "tl", text: "East Timor", phoneCode: "+670" },
  { key: "ee", value: "ee", flag: "ee", text: "Estonia", phoneCode: "+372" },
  { key: "et", value: "et", flag: "et", text: "Ethiopia", phoneCode: "+251" },
  {
    key: "fk",
    value: "fk",
    flag: "fk",
    text: "Falkland Islands",
    phoneCode: "+500",
  },
  {
    key: "fo",
    value: "fo",
    flag: "fo",
    text: "Faroe Islands",
    phoneCode: "+298",
  },
  { key: "fj", value: "fj", flag: "fj", text: "Fiji", phoneCode: "+679" },
  { key: "fi", value: "fi", flag: "fi", text: "Finland", phoneCode: "+358" },
  { key: "fr", value: "fr", flag: "fr", text: "France", phoneCode: "+33" },
  {
    key: "gf",
    value: "gf",
    flag: "gf",
    text: "French Guiana",
    phoneCode: "+594",
  },
  {
    key: "pf",
    value: "pf",
    flag: "pf",
    text: "French Polynesia",
    phoneCode: "+689",
  },
  { key: "ga", value: "ga", flag: "ga", text: "Gabon", phoneCode: "+241" },
  { key: "gm", value: "gm", flag: "gm", text: "Gambia", phoneCode: "+220" },
  { key: "ge", value: "ge", flag: "ge", text: "Georgia", phoneCode: "+995" },
  { key: "de", value: "de", flag: "de", text: "Germany", phoneCode: "+49" },
  { key: "gh", value: "gh", flag: "gh", text: "Ghana", phoneCode: "+233" },
  { key: "gi", value: "gi", flag: "gi", text: "Gibraltar", phoneCode: "+350" },
  { key: "gr", value: "gr", flag: "gr", text: "Greece", phoneCode: "+30" },
  { key: "gl", value: "gl", flag: "gl", text: "Greenland", phoneCode: "+299" },
  { key: "gd", value: "gd", flag: "gd", text: "Grenada", phoneCode: "+1" },
  { key: "gp", value: "gp", flag: "gp", text: "Guadeloupe", phoneCode: "+590" },
  { key: "gu", value: "gu", flag: "gu", text: "Guam", phoneCode: "+1" },
  { key: "gt", value: "gt", flag: "gt", text: "Guatemala", phoneCode: "+502" },
  { key: "gg", value: "gg", flag: "gg", text: "Guernsey", phoneCode: "+44" },
  { key: "gn", value: "gn", flag: "gn", text: "Guinea", phoneCode: "+224" },
  {
    key: "gw",
    value: "gw",
    flag: "gw",
    text: "Guinea-Bissau",
    phoneCode: "+245",
  },
  { key: "gy", value: "gy", flag: "gy", text: "Guyana", phoneCode: "+592" },
  { key: "ht", value: "ht", flag: "ht", text: "Haiti", phoneCode: "+509" },
  { key: "hn", value: "hn", flag: "hn", text: "Honduras", phoneCode: "+504" },
  { key: "hk", value: "hk", flag: "hk", text: "Hong Kong", phoneCode: "+852" },
  { key: "hu", value: "hu", flag: "hu", text: "Hungary", phoneCode: "+36" },
  { key: "is", value: "is", flag: "is", text: "Iceland", phoneCode: "+354" },
  { key: "in", value: "in", flag: "in", text: "India", phoneCode: "+91" },
  { key: "id", value: "id", flag: "id", text: "Indonesia", phoneCode: "+62" },
  { key: "ir", value: "ir", flag: "ir", text: "Iran", phoneCode: "+98" },
  { key: "iq", value: "iq", flag: "iq", text: "Iraq", phoneCode: "+964" },
  { key: "ie", value: "ie", flag: "ie", text: "Ireland", phoneCode: "+353" },
  { key: "im", value: "im", flag: "im", text: "Isle of Man", phoneCode: "+44" },
  { key: "il", value: "il", flag: "il", text: "Israel", phoneCode: "+972" },
  { key: "it", value: "it", flag: "it", text: "Italy", phoneCode: "+39" },
  { key: "jm", value: "jm", flag: "jm", text: "Jamaica", phoneCode: "+1" },
  { key: "jp", value: "jp", flag: "jp", text: "Japan", phoneCode: "+81" },
  { key: "je", value: "je", flag: "je", text: "Jersey", phoneCode: "+44" },
  { key: "jo", value: "jo", flag: "jo", text: "Jordan", phoneCode: "+962" },
  { key: "kz", value: "kz", flag: "kz", text: "Kazakhstan", phoneCode: "+7" },
  { key: "ke", value: "ke", flag: "ke", text: "Kenya", phoneCode: "+254" },
  { key: "ki", value: "ki", flag: "ki", text: "Kiribati", phoneCode: "+686" },
  { key: "kw", value: "kw", flag: "kw", text: "Kuwait", phoneCode: "+965" },
  { key: "kg", value: "kg", flag: "kg", text: "Kyrgyzstan", phoneCode: "+996" },
  { key: "la", value: "la", flag: "la", text: "Laos", phoneCode: "+856" },
  { key: "lv", value: "lv", flag: "lv", text: "Latvia", phoneCode: "+371" },
  { key: "lb", value: "lb", flag: "lb", text: "Lebanon", phoneCode: "+961" },
  { key: "ls", value: "ls", flag: "ls", text: "Lesotho", phoneCode: "+266" },
  { key: "lr", value: "lr", flag: "lr", text: "Liberia", phoneCode: "+231" },
  { key: "ly", value: "ly", flag: "ly", text: "Libya", phoneCode: "+218" },
  {
    key: "li",
    value: "li",
    flag: "li",
    text: "Liechtenstein",
    phoneCode: "+423",
  },
  { key: "lt", value: "lt", flag: "lt", text: "Lithuania", phoneCode: "+370" },
  { key: "lu", value: "lu", flag: "lu", text: "Luxembourg", phoneCode: "+352" },
  { key: "mo", value: "mo", flag: "mo", text: "Macau", phoneCode: "+853" },
  {
    key: "mk",
    value: "mk",
    flag: "mk",
    text: "North Macedonia",
    phoneCode: "+389",
  },
  { key: "mg", value: "mg", flag: "mg", text: "Madagascar", phoneCode: "+261" },
  { key: "mw", value: "mw", flag: "mw", text: "Malawi", phoneCode: "+265" },
  { key: "my", value: "my", flag: "my", text: "Malaysia", phoneCode: "+60" },
  { key: "mv", value: "mv", flag: "mv", text: "Maldives", phoneCode: "+960" },
  { key: "ml", value: "ml", flag: "ml", text: "Mali", phoneCode: "+223" },
  { key: "mt", value: "mt", flag: "mt", text: "Malta", phoneCode: "+356" },
  {
    key: "mh",
    value: "mh",
    flag: "mh",
    text: "Marshall Islands",
    phoneCode: "+692",
  },
  { key: "mq", value: "mq", flag: "mq", text: "Martinique", phoneCode: "+596" },
  { key: "mr", value: "mr", flag: "mr", text: "Mauritania", phoneCode: "+222" },
  { key: "mu", value: "mu", flag: "mu", text: "Mauritius", phoneCode: "+230" },
  { key: "yt", value: "yt", flag: "yt", text: "Mayotte", phoneCode: "+262" },
  { key: "mx", value: "mx", flag: "mx", text: "Mexico", phoneCode: "+52" },
  { key: "fm", value: "fm", flag: "fm", text: "Micronesia", phoneCode: "+691" },
  { key: "md", value: "md", flag: "md", text: "Moldova", phoneCode: "+373" },
  { key: "mc", value: "mc", flag: "mc", text: "Monaco", phoneCode: "+377" },
  { key: "mn", value: "mn", flag: "mn", text: "Mongolia", phoneCode: "+976" },
  { key: "me", value: "me", flag: "me", text: "Montenegro", phoneCode: "+382" },
  { key: "ms", value: "ms", flag: "ms", text: "Montserrat", phoneCode: "+1" },
  { key: "ma", value: "ma", flag: "ma", text: "Morocco", phoneCode: "+212" },
  { key: "mz", value: "mz", flag: "mz", text: "Mozambique", phoneCode: "+258" },
  { key: "mm", value: "mm", flag: "mm", text: "Myanmar", phoneCode: "+95" },
  { key: "na", value: "na", flag: "na", text: "Namibia", phoneCode: "+264" },
  { key: "nr", value: "nr", flag: "nr", text: "Nauru", phoneCode: "+674" },
  { key: "np", value: "np", flag: "np", text: "Nepal", phoneCode: "+977" },
  { key: "nl", value: "nl", flag: "nl", text: "Netherlands", phoneCode: "+31" },
  {
    key: "nc",
    value: "nc",
    flag: "nc",
    text: "New Caledonia",
    phoneCode: "+687",
  },
  { key: "nz", value: "nz", flag: "nz", text: "New Zealand", phoneCode: "+64" },
  { key: "ni", value: "ni", flag: "ni", text: "Nicaragua", phoneCode: "+505" },
  { key: "ne", value: "ne", flag: "ne", text: "Niger", phoneCode: "+227" },
  { key: "ng", value: "ng", flag: "ng", text: "Nigeria", phoneCode: "+234" },
  { key: "nu", value: "nu", flag: "nu", text: "Niue", phoneCode: "+683" },
  {
    key: "nf",
    value: "nf",
    flag: "nf",
    text: "Norfolk Island",
    phoneCode: "+672",
  },
  {
    key: "kp",
    value: "kp",
    flag: "kp",
    text: "North Korea",
    phoneCode: "+850",
  },
  {
    key: "mp",
    value: "mp",
    flag: "mp",
    text: "Northern Mariana Islands",
    phoneCode: "+1",
  },
  { key: "no", value: "no", flag: "no", text: "Norway", phoneCode: "+47" },
  { key: "om", value: "om", flag: "om", text: "Oman", phoneCode: "+968" },
  { key: "pk", value: "pk", flag: "pk", text: "Pakistan", phoneCode: "+92" },
  { key: "pw", value: "pw", flag: "pw", text: "Palau", phoneCode: "+680" },
  { key: "ps", value: "ps", flag: "ps", text: "Palestine", phoneCode: "+970" },
  { key: "pa", value: "pa", flag: "pa", text: "Panama", phoneCode: "+507" },
  {
    key: "pg",
    value: "pg",
    flag: "pg",
    text: "Papua New Guinea",
    phoneCode: "+675",
  },
  { key: "py", value: "py", flag: "py", text: "Paraguay", phoneCode: "+595" },
  { key: "pe", value: "pe", flag: "pe", text: "Peru", phoneCode: "+51" },
  { key: "ph", value: "ph", flag: "ph", text: "Philippines", phoneCode: "+63" },
  {
    key: "pn",
    value: "pn",
    flag: "pn",
    text: "Pitcairn Islands",
    phoneCode: "+64",
  },
  { key: "pl", value: "pl", flag: "pl", text: "Poland", phoneCode: "+48" },
  { key: "pt", value: "pt", flag: "pt", text: "Portugal", phoneCode: "+351" },
  { key: "pr", value: "pr", flag: "pr", text: "Puerto Rico", phoneCode: "+1" },
  { key: "qa", value: "qa", flag: "qa", text: "Qatar", phoneCode: "+974" },
  { key: "re", value: "re", flag: "re", text: "Réunion", phoneCode: "+262" },
  { key: "ro", value: "ro", flag: "ro", text: "Romania", phoneCode: "+40" },
  { key: "ru", value: "ru", flag: "ru", text: "Russia", phoneCode: "+7" },
  { key: "rw", value: "rw", flag: "rw", text: "Rwanda", phoneCode: "+250" },
  {
    key: "bl",
    value: "bl",
    flag: "bl",
    text: "Saint Barthélemy",
    phoneCode: "+590",
  },
  {
    key: "sh",
    value: "sh",
    flag: "sh",
    text: "Saint Helena",
    phoneCode: "+290",
  },
  {
    key: "kn",
    value: "kn",
    flag: "kn",
    text: "Saint Kitts and Nevis",
    phoneCode: "+1",
  },
  { key: "lc", value: "lc", flag: "lc", text: "Saint Lucia", phoneCode: "+1" },
  {
    key: "mf",
    value: "mf",
    flag: "mf",
    text: "Saint Martin",
    phoneCode: "+590",
  },
  {
    key: "pm",
    value: "pm",
    flag: "pm",
    text: "Saint Pierre and Miquelon",
    phoneCode: "+508",
  },
  {
    key: "vc",
    value: "vc",
    flag: "vc",
    text: "Saint Vincent and the Grenadines",
    phoneCode: "+1",
  },
  { key: "ws", value: "ws", flag: "ws", text: "Samoa", phoneCode: "+685" },
  { key: "sm", value: "sm", flag: "sm", text: "San Marino", phoneCode: "+378" },
  {
    key: "st",
    value: "st",
    flag: "st",
    text: "São Tomé and Príncipe",
    phoneCode: "+239",
  },
  {
    key: "sa",
    value: "sa",
    flag: "sa",
    text: "Saudi Arabia",
    phoneCode: "+966",
  },
  { key: "sn", value: "sn", flag: "sn", text: "Senegal", phoneCode: "+221" },
  { key: "rs", value: "rs", flag: "rs", text: "Serbia", phoneCode: "+381" },
  { key: "sc", value: "sc", flag: "sc", text: "Seychelles", phoneCode: "+248" },
  {
    key: "sl",
    value: "sl",
    flag: "sl",
    text: "Sierra Leone",
    phoneCode: "+232",
  },
  { key: "sg", value: "sg", flag: "sg", text: "Singapore", phoneCode: "+65" },
  { key: "sk", value: "sk", flag: "sk", text: "Slovakia", phoneCode: "+421" },
  { key: "si", value: "si", flag: "si", text: "Slovenia", phoneCode: "+386" },
  {
    key: "sb",
    value: "sb",
    flag: "sb",
    text: "Solomon Islands",
    phoneCode: "+677",
  },
  { key: "so", value: "so", flag: "so", text: "Somalia", phoneCode: "+252" },
  {
    key: "za",
    value: "za",
    flag: "za",
    text: "South Africa",
    phoneCode: "+27",
  },
  { key: "kr", value: "kr", flag: "kr", text: "South Korea", phoneCode: "+82" },
  {
    key: "ss",
    value: "ss",
    flag: "ss",
    text: "South Sudan",
    phoneCode: "+211",
  },
  { key: "es", value: "es", flag: "es", text: "Spain", phoneCode: "+34" },
  { key: "lk", value: "lk", flag: "lk", text: "Sri Lanka", phoneCode: "+94" },
  { key: "sd", value: "sd", flag: "sd", text: "Sudan", phoneCode: "+249" },
  { key: "sr", value: "sr", flag: "sr", text: "Suriname", phoneCode: "+597" },
  {
    key: "sj",
    value: "sj",
    flag: "sj",
    text: "Svalbard and Jan Mayen",
    phoneCode: "+47",
  },
  { key: "sz", value: "sz", flag: "sz", text: "Eswatini", phoneCode: "+268" },
  { key: "se", value: "se", flag: "se", text: "Sweden", phoneCode: "+46" },
  { key: "ch", value: "ch", flag: "ch", text: "Switzerland", phoneCode: "+41" },
  { key: "sy", value: "sy", flag: "sy", text: "Syria", phoneCode: "+963" },
  { key: "tw", value: "tw", flag: "tw", text: "Taiwan", phoneCode: "+886" },
  { key: "tj", value: "tj", flag: "tj", text: "Tajikistan", phoneCode: "+992" },
  { key: "tz", value: "tz", flag: "tz", text: "Tanzania", phoneCode: "+255" },
  { key: "th", value: "th", flag: "th", text: "Thailand", phoneCode: "+66" },
  { key: "tg", value: "tg", flag: "tg", text: "Togo", phoneCode: "+228" },
  { key: "tk", value: "tk", flag: "tk", text: "Tokelau", phoneCode: "+690" },
  { key: "to", value: "to", flag: "to", text: "Tonga", phoneCode: "+676" },
  {
    key: "tt",
    value: "tt",
    flag: "tt",
    text: "Trinidad and Tobago",
    phoneCode: "+1",
  },
  { key: "tn", value: "tn", flag: "tn", text: "Tunisia", phoneCode: "+216" },
  { key: "tr", value: "tr", flag: "tr", text: "Turkey", phoneCode: "+90" },
  {
    key: "tm",
    value: "tm",
    flag: "tm",
    text: "Turkmenistan",
    phoneCode: "+993",
  },
  {
    key: "tc",
    value: "tc",
    flag: "tc",
    text: "Turks and Caicos Islands",
    phoneCode: "+1",
  },
  { key: "tv", value: "tv", flag: "tv", text: "Tuvalu", phoneCode: "+688" },
  { key: "ug", value: "ug", flag: "ug", text: "Uganda", phoneCode: "+256" },
  { key: "ua", value: "ua", flag: "ua", text: "Ukraine", phoneCode: "+380" },
  {
    key: "ae",
    value: "ae",
    flag: "ae",
    text: "United Arab Emirates",
    phoneCode: "+971",
  },
  {
    key: "gb",
    value: "gb",
    flag: "gb",
    text: "United Kingdom",
    phoneCode: "+44",
  },
  {
    key: "us",
    value: "us",
    flag: "us",
    text: "United States",
    phoneCode: "+1",
  },
  { key: "uy", value: "uy", flag: "uy", text: "Uruguay", phoneCode: "+598" },
  { key: "uz", value: "uz", flag: "uz", text: "Uzbekistan", phoneCode: "+998" },
  { key: "vu", value: "vu", flag: "vu", text: "Vanuatu", phoneCode: "+678" },
  {
    key: "va",
    value: "va",
    flag: "va",
    text: "Vatican City",
    phoneCode: "+39",
  },
  { key: "ve", value: "ve", flag: "ve", text: "Venezuela", phoneCode: "+58" },
  { key: "vn", value: "vn", flag: "vn", text: "Vietnam", phoneCode: "+84" },
  {
    key: "wf",
    value: "wf",
    flag: "wf",
    text: "Wallis and Futuna",
    phoneCode: "+681",
  },
  {
    key: "eh",
    value: "eh",
    flag: "eh",
    text: "Western Sahara",
    phoneCode: "+212",
  },
  { key: "ye", value: "ye", flag: "ye", text: "Yemen", phoneCode: "+967" },
  { key: "zm", value: "zm", flag: "zm", text: "Zambia", phoneCode: "+260" },
  { key: "zw", value: "zw", flag: "zw", text: "Zimbabwe", phoneCode: "+263" },
];

const userType = [
  { key: "landlord", text: "Landlord", value: "landlord" },
  { key: "tenant", text: "Tenant", value: "tenant" },
];

const idTypeOptions = [
  { key: "passport", value: "passport", text: "Passport" },
  { key: "driverLicense", value: "driverLicense", text: "Driver License" },
  { key: "nationalID", value: "nationalID", text: "National ID" },
];

const SignUp = () => {
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [termsChecked, setTermsChecked] = useState(false);
  const [error, setError] = useState(null);
  const [selectUserType, setUserType] = useState('');
  const navigate = useNavigate();

  const handleCheckboxChange = () => {
    setTermsChecked(!termsChecked);
  };

   const handleUserTypeChange = (_, { value }) => {
    setUserType(value);
  };

  const handleCountryChange = (e, { value }) => {
    const selectedCountryInfo = countryOptions.find(
      (country) => country.value === value
    );
    setSelectedCountry(value);
    setPhoneCode(selectedCountryInfo ? selectedCountryInfo.phoneCode : "");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // Check if passwords match when the user types
    setPasswordsMatch(e.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    // Check if passwords match when the user types
    setPasswordsMatch(e.target.value === password);
  };



  $('.register-form').off('submit').on('submit', function(){
    
    // Check if passwords match before submitting the form
    if (password === confirmPassword  && termsChecked) {
      const formData = {
      firstName: $('input[name="firstName"]').val(),
      middleName: $('input[name="middleName"]').val(),
      lastName: $('input[name="lastName"]').val(),
      email: $('input[name="email"]').val(),
      country: selectedCountry, // Assuming selectedCountry is a state in your component
      phoneNumber: $('input[name="phoneNumber"]').val(),
      password: $('input[name="password"]').val(),
      confirmPassword: $('input[name="confirmPassword"]').val(),
      userType: selectUserType,
      IDType: $('select[name="IDType"]').val(),
      file: $('input[name="file"]')[0].files[0],
    };

    // Create a FormData object for sending files
    const formDataToSend = new FormData();
    for (const key in formData) {
      if (formData[key] !== undefined) {
        formDataToSend.append(key, formData[key]);
      }
    }
      setLoading(true);
    $.ajax({
      type: "POST",
      url: "https://api.imbapano.com/api/register",
      data: JSON.stringify(formData),
      contentType: 'application/json',
      cache: false,
      processData: false,
      success: function(response) {
        if(response.status_code === 201){
          localStorage.setItem('user', JSON.stringify(response.user));
          localStorage.setItem('token', response.token);
          setLoading(false);
          navigate('/verify');
        }
        setError(response.message);
        setLoading(false);
      },
      error: function() {
        setError('Something went wrong');
        setLoading(false);
      }
    });
      
    } else {
      // Provide feedback to the user about missing information
      setPasswordsMatch(password === confirmPassword);
      setPasswordsMatch(false);
    }

    return false;
  })
  return (
    <div className="SignUp" data-testid="SignUp">
      <Header />

      <div className="login-container">
        <div className="">
          <div className="login-content">
            <Container>
              <Row className="justify-content-center align-items-center">
                <Col md="4">
                  <h2>Create Your Real Estate Account</h2>
                  <p>
                    Unlock exclusive features and personalized recommendations
                    by creating your account today.
                  </p>
                </Col>

                <Col md="5">
                  <div className="box">
                    <Form className="register-form" loading={loading}>
                      <Form.Group unstackable widths={3}>
                        <Form.Input
                          label="First name"
                          placeholder="First name"
                          name="firstName"
                          required
                        />
                        <Form.Input
                          label="Middle name"
                          placeholder="Middle name"
                          name="middleName"
                        />
                        <Form.Input
                          label="Last name"
                          placeholder="Last name"
                          name="lastName"
                          required
                        />
                      </Form.Group>
                      <Form.Input
                        label="Email address"
                        type="email"
                        name="email"
                        placeholder="Enter your email address"
                        required
                      />

                      <Form.Field
                        control={Select}
                        label="Select Country"
                        placeholder="Select Country"
                        name="country"
                        fluid
                        search
                        selection
                        options={countryOptions}
                        onChange={handleCountryChange}
                        value={selectedCountry}
                        required
                      />

                      <Form.Field>
                        <Form.Input
                          labelPosition="right"
                          type="number"
                          label="Phone Number"
                          name="phoneNumber"
                          placeholder="Phone Number"
                          required
                        >
                          <Label basic>{phoneCode}</Label>
                          <input
                            style={{ borderRight: "1px solid #ddd !important" }}
                          />
                        </Form.Input>
                      </Form.Field>

                      <Form.Field>
                        <Form.Group unstackable widths={2}>
                          <Form.Input
                            label="Password"
                            type="password"
                            name="password"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="Password"
                            required
                          />
                          <Form.Input
                            label="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            placeholder="Confirm Password"
                            required
                          />
                        </Form.Group>
                        {!passwordsMatch && (
                          <Message negative style={{width: '100%'}}>
                            <Message.Header>
                              Passwords do not match
                            </Message.Header>
                            <p>Please make sure the passwords match.</p>
                          </Message>
                        )}
                       
                      </Form.Field>

                      <Form.Input
                        control={Select}
                        label="Select Type"
                        options={userType}
                        name="userType"
                        placeholder="User Type"
                        onChange={handleUserTypeChange}
                        value={selectUserType}
                        required
                      />
                      <p>Upload your ID for verification.</p>

                      <Form.Group unstackable widths={2}>
                        <Form.Input
                          control={Select}
                          label="Select ID Type"
                          name="IDType"
                          options={idTypeOptions}
                          placeholder="Select ID Type"
                        />

                        <Form.Input
                          type="file"
                          name="file"
                          accept=".jpg, .jpeg, .png, .pdf"
                          label="Upload ID"
                        />
                      </Form.Group>
                      <Form.Input
                        control={Checkbox}
                        label="I agree to the Terms and Conditions"
                         onChange={handleCheckboxChange}
                          checked={termsChecked}
                        required
                      />
                      {!termsChecked && (
                        <Message negative style={{width: '100%'}}>
                          <Message.Header>Terms and Conditions must be accepted</Message.Header>
                          <p>Please check the Terms and Conditions checkbox.</p>
                        </Message>
                      )}
                      <Button
                        type="submit"
                        color="red"
                        style={{ width: "100%" }}
                      >
                        Sign Up
                      </Button>
                      {error && (
                      <Message negative style={{width: '100%'}}>
                        <Message.Header>Error</Message.Header>
                        <p>{error}</p>
                      </Message>
                    )}
                      
                    </Form>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
