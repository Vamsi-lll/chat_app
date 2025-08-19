const entry_frame=document.getElementById('enter_frame')
function Login(){
    let user_name=document.getElementById('user_name')
    if(user_name.value.trim()===""){
        alert('enter your name to proceed')
    }
    else{
        let profile_username=document.getElementById('profile_username')
        if (profile_username) {
            profile_username.innerText = user_name.value;
        }
        if (entry_frame) {
            entry_frame.remove();
        }
    }

}
