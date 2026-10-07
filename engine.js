(function(root){
'use strict';
function plan(names,minutes=8,gap=2,start='18:00'){
 if(!Array.isArray(names)||names.length<2||names.length>60)throw Error('Enter 2 to 60 people.');
 names=names.map(x=>String(x).trim());
 if(names.some(x=>!x||x.length>60)||new Set(names.map(x=>x.toLowerCase())).size!==names.length)throw Error('Use unique names, each 1 to 60 characters.');
 if(!Number.isInteger(minutes)||minutes<1||minutes>120||!Number.isInteger(gap)||gap<0||gap>60)throw Error('Conversation: 1 to 120 minutes. Transition: 0 to 60 minutes. Whole minutes only.');
 if(!/^([01]\d|2[0-3]):[0-5]\d$/.test(start))throw Error('Choose a valid start time.');
 let circle=names.map((_,i)=>i);if(circle.length%2)circle.push(null);
 const rounds=[], n=circle.length,begin=Number(start.slice(0,2))*60+Number(start.slice(3));
 function time(t){const day=Math.floor(t/1440),m=t%1440;return String(Math.floor(m/60)).padStart(2,'0')+':'+String(m%60).padStart(2,'0')+(day?' (day +'+day+')':'');}
 for(let r=0;r<n-1;r++){
 const pairs=[],byes=[];
 for(let i=0;i<n/2;i++){let a=circle[i],b=circle[n-1-i];if(a===null||b===null)byes.push(a===null?b:a);else pairs.push([a,b]);}
 const offset=begin+r*(minutes+gap);
 rounds.push({number:r+1,pairs,byes,start:time(offset),end:time(offset+minutes)});
 circle.splice(1,0,circle.pop());
 }
 return {names,rounds,pairCount:names.length*(names.length-1)/2,duration:(n-1)*minutes+(n-2)*gap,tables:Math.floor(names.length/2)};
}
const api={plan};if(typeof module!=='undefined')module.exports=api;else root.RoundLink=api;
})(typeof window!=='undefined'?window:globalThis);
