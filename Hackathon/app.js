import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateEmail, updateProfile } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { doc, setDoc, getFirestore, getDoc,addDoc,collection,query, where, onSnapshot 
               } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js"; 








               

  const firebaseConfig = {
    apiKey: "AIzaSyB4U45n-S7pZz5GtgQlpWxw2j0UDb85Cb0",
    authDomain: "mini-hackathon-smit-2e115.firebaseapp.com",
    projectId: "mini-hackathon-smit-2e115",
    storageBucket: "mini-hackathon-smit-2e115.appspot.com",
    messagingSenderId: "98709228285",
    appId: "1:98709228285:web:565de943b60762103f4c94",
    measurementId: "G-HNKLNF4ED1"
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app)
  const db = getFirestore(app);


  let email = document.getElementById("email")
  let password = document.getElementById("password")
  let signUp = document.getElementById("signup-btn")
  let loginBtn = document.getElementById("loginBtn")
  let logoutBtn = document.getElementById("logout-btn")
  let NewEmail = document.getElementById("update-profile")
  let fileInput = document.getElementById("file-input")
  let fullName = document.getElementById("fullName")
  let myUser = document.getElementById("my-user")
  let publish = document.getElementById("publish")
  let newPassword = document.getElementById("newPasswprd")

  
  
  signUp && signUp.addEventListener("click", () => {
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then(async(res) => {
        const user = res.user;
        localStorage.setItem("uid", user.uid)
        await setDoc(doc(db, "user", user.uid), {
          email: email.value,
          fullName: fullName.value,
          password: password.value,
          image : "images/1.png"
        });
        Swal.fire({
          text: 'SignUp Successfully!',
        })
        window.location.href = "dashboard.html"
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log("errorMessage", errorMessage)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errorMessage,
        })
      });
  
  
  })
  
  loginBtn && loginBtn.addEventListener("click", () => {
    let email = document.getElementById("email")
    let password = document.getElementById("password")
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then(async (res) => {
        const user = res.user;
        const docRef = doc(db, "user", user.uid);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    console.log("No such document!");
  }
        alert({
          text: 'Login Successfully!',
        })
        window.location.href = "dashboard.html"
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errorMessage,
        })
      });
  
  })
  
  
  onAuthStateChanged(auth, (user) => {
    const uid = localStorage.getItem("uid")
    if (user && uid) {
      const uid = user.uid;
      if (location.pathname !== '/dashboard.html'&& location.pathname !== '/profile.html' ) {
        location.href = "dashboard.html"
      }
    } else {
      if (location.pathname !== "/login.html" && location.pathname !== '/signup.html' && location.pathname !== '/index.html') {
        location.pathname = '/index.html' 
      }
    }
  });
  
  
  logoutBtn && logoutBtn.addEventListener("click", () => {
  
    signOut(auth).then(() => {
      console.log("done")
      Swal.fire({
        text: 'Sign Out!',
      })
    }).catch((error) => {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error,
      })
    });
  })
  
  
  NewEmail && NewEmail.addEventListener("click", () => {
  
    updateEmail(auth.currentUser, NewEmail.value).then(() => {
      console.log("Profile updated!")
      Swal.fire({
        text: 'Profile updated!',
      })
  
    }).catch((error) => {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error,
      })
    });
  
    updateProfile(auth.currentUser, {
      password: newPassword.value, photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(() => {
      Swal.fire({
        text: 'Profile updated!',
      })
    }).catch((error) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error,
      })
    });
  })

  const data = async () =>{
    let myUser = document.getElementById("my-user")

const docRef = doc(db, "user", localStorage.getItem("uid"))
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
//   console.log("Document data:", docSnap.data());
if(myUser){

    myUser.innerHTML = docSnap.data().fullName
}
  
} else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
}
  }

  data()
console.log(localStorage.getItem("uid"))


 publish && publish.addEventListener("click" ,async ()=> {
    const text = document.getElementById("topic");
    const blog = document.getElementById("blog")

const docRef = await addDoc(collection(db, "blog"), {
    topic: topic.value,
    blog: blog.value,
    uid : localStorage.getItem("uid"),

});
console.log("Document written with ID: ", docRef.id);

  })


  const getBlogData = () =>{
    console.log(localStorage.getItem("uid"))
    const q = query(collection(db, "blog"), where("uid", "==",`${localStorage.getItem("uid")}` ));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let mains = document.getElementById("main-card")
        mains.innerHTML=""

        console.log("querySnapshot",querySnapshot)
  
      querySnapshot.forEach((doc) => {
        console.log("doc-->",doc.data())
        let date = new Date()
  
        mains.innerHTML += `
        <div class="main-box mb-4">
        <div class="main-box-div-1">
                    <div class="main-box-img">
                        <img src="${doc.data().image} || 'images/1.png' "alt="">
                    </div>
                    <div class="main-box-div-1-text">
                        <p><b>${doc.data().topic}</b></p>
                      <p><span  > ${doc.data().fullName}</span>
                       <span id="time">${date.toLocaleString()}</span></p>
                    </div>
                </div>
  
                <div class="main-box-div-2">
                    <p class="blogpa">${doc.data().blog}</p>
  
                    <div class="main-box-div-2-anchor">
                        <a href="#">
                            <p onclick="deletedoc('${doc.id}')">Delete</p>
                        </a>
                        <a href="#">
                            <p>Edit</p>
                        </a>
                    </div>
                </div>
        </div>
        `
      });
    //   console.log("Current cities in CA: ", cities.join(", "));
    });
  
    }
  
    getBlogData()
  
    



    const getAllData = () =>{
        const q = query(collection(db, "blog")  );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            
            
            querySnapshot.forEach((doc) => {
                let date = new Date()
                let mainIndex = document.getElementById("main-card")

                mainIndex.innerHTML += `
                <div class="div-1">
                <div class="card-imgs">
                    <img src=${doc.data().image} || 'images/1.png' " alt="">
                </div>
                <div class="card-h1">
                    <h1>${doc.data().topic}</h1>
                    <p>Elon Musk-August 17th,2023</p>
                </div>
            </div>

            <div class="div-2">
                <div class="card-p">
                    <p>${doc.data().blog}</p>


                    <a href="">see all from this user</a>

                </div>
            `
          });
        // {/* //   console.log("Current cities in CA: ", cities.join(", ")); */}
        });
      
        }

        // getAllData()