/* Shared theme: used by index.html and project.html. Saved value is 'dark' or 'light'; nothing saved = follow the device. */
(function(){
  var KEY='theme',root=document.documentElement,mq=matchMedia('(prefers-color-scheme: dark)');
  function saved(){try{var v=localStorage.getItem(KEY);return v==='dark'||v==='light'?v:null}catch(e){return null}}
  function current(){return saved()||(mq.matches?'dark':'light')}
  function apply(){
    var t=current();root.dataset.theme=t;
    var m=document.querySelector('meta[name="theme-color"]');if(m)m.content=t==='dark'?'#0e0f0e':'#f7f7f4';
    document.dispatchEvent(new CustomEvent('themechange',{detail:t}));
  }
  window.toggleTheme=function(){try{localStorage.setItem(KEY,current()==='dark'?'light':'dark')}catch(e){}apply()};
  apply();
  if(mq.addEventListener)mq.addEventListener('change',function(){if(!saved())apply()});
  addEventListener('storage',function(e){if(e.key===KEY)apply()});
})();
