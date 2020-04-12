const url = "/all/poll";
const html_loc = document.querySelector(".main--poll");
var check;
async function fetchpoll() {
  let poll = await axios(url);
  all_poll = poll.data;

  all_poll.forEach((cur) => {
    let Question = cur.question;

    let id = cur.id;

    const html = `
    
    <div class="card" key=${id}>
          
    <div class="instagram_box">
        <center>
             <input type="text" name="id" value=${id} hidden=true/>
            <h3>${Question}</h3>
            <br>
            <div id =${id}>
            <button class="btn" value="YES" name="answer" onClick="ans('YES','${id}')">
                YES
            </button>
            <button  class="btn" value="NO" name="answer" onClick="ans('NO','${id}')" >
                NO
            </button>
           </div>
            
            </button>
            <br />
            <br />
        </center>

    </div>
    
</div>`;
    html_loc.insertAdjacentHTML("afterbegin", html);
  });
}

fetchpoll();
