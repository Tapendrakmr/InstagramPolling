const url = "/all/poll";
const html_loc = document.querySelector(".main--poll");
var check;
async function fetchpoll() {
  let poll = await axios(url);
  all_poll = poll.data;

  all_poll.forEach((cur) => {
    let Question = cur.question;
    let Answer = cur.answer;
    let id = cur.id;
    let yes = cur.yes;
    let no = cur.no;
    const html = `
    <div class="card" key=${id}>
          <form action="/poll_answer" method="POST">
            <div class="instagram_box">
                <center>
                     <input type="text" name="id" value=${id} hidden=true/>
                    <h3>${Question}</h3>
                    <br>
                    <p>Your answer :${Answer}
                    <p>People say YES :${yes}
                    <p>People sya NO :${no}
                    <br />
                    <br />
                </center>

            </div>
            </form>
        </div>`;
    html_loc.insertAdjacentHTML("afterbegin", html);
  });
}

fetchpoll();

function update() {
  alert("update successfully");
}
