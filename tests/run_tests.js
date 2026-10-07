const assert=require('node:assert/strict'),{plan}=require('../engine');let cases=0;
for(let n=2;n<=60;n++){
 const p=plan(Array.from({length:n},(_,i)=>'Person '+i)),seen=new Set(),meet=Array(n).fill(0),bye=Array(n).fill(0);
 assert.equal(p.rounds.length,n%2?n:n-1);
 for(const r of p.rounds){const active=new Set();for(const [a,b] of r.pairs){assert.notEqual(a,b);assert(!active.has(a)&&!active.has(b));active.add(a);active.add(b);const k=[a,b].sort((x,y)=>x-y).join(':');assert(!seen.has(k));seen.add(k);meet[a]++;meet[b]++;}for(const a of r.byes){assert(!active.has(a));active.add(a);bye[a]++;}assert.equal(active.size,n);assert.equal(r.byes.length,n%2);}
 // Independent oracle: every unordered pair exists exactly once.
 for(let a=0;a<n;a++)for(let b=a+1;b<n;b++)assert(seen.has(a+':'+b));
 assert.equal(seen.size,n*(n-1)/2);assert(meet.every(x=>x===n-1));assert(bye.every(x=>x===n%2));cases++;
}
assert.equal(plan(['A','B','C'],8,2,'23:55').rounds[1].start,'00:05 (day +1)');cases++;
assert.equal(plan(['A','B'],8,2).duration,8);cases++;
for(const args of [[[]],[['a']],[['a','A']],[['a','']],[['a','b'],0],[['a','b'],8,-1],[['a','b'],8,2,'24:00'],[Array(61).fill('x')]]){assert.throws(()=>plan(...args));cases++;}
console.log(cases+' cases passed: independent complete-pair oracle, round uniqueness, byes, validation, midnight.');
