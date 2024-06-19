// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup, 
  getRedirectResult 

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  apiKey: "AIzaSyAkislfgEO0jdr5dYa4LI12ZhNYTMtPD30",
  authDomain: "gsmil07-bb37b.firebaseapp.com",
  databaseURL: "https://gsmil07-bb37b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "gsmil07-bb37b",
  storageBucket: "gsmil07-bb37b.appspot.com",
  messagingSenderId: "628142568752",
  appId: "1:628142568752:web:f435de62380b3adda184f5",
  measurementId: "G-SNTKEKZRBY"
};
// Initialize Firebase
// initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


// クロスオリジン設定
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result && result.user) {
      console.log("リダイレクト後のサインインに成功しました", result.user);
    }
  } catch (error) {
    console.error("リダイレクト後のサインインに失敗しました", error);
  }

  document.getElementById('login-button').addEventListener('click', () => {
    signInWithPopup(auth, provider).then((result) => {
      console.log("サインインに成功しました", result.user);
    }).catch((error) => {
      console.error("サインインに失敗しました", error);
      alert(`Error: ${error.message} (Code: ${error.code})`);
    });
  });
});


function signUpUser(email,password){
  const auth = getAuth();
  console.log(email,password,2);

  createUserWithEmailAndPassword(auth, email, password)
  .then(function(userInfo){
    //成功時
    console.log(userInfo);


  })
  .catch(function(error){
    //失敗、エラー時
    console.log(error);

  });
  

}


$("#signup-button").on("click",function(){
  const email = $("#signup-email").val();
  const password = $("#signup-password").val();
  console.log(email,password,1);
  signUpUser(email,password);
  
});

//ログイン処理を担当する独自関数
function loginUser(email,password){
  const auth = getAuth();

  signInWithEmailAndPassword(auth,email,password)
  .then(function(userInfo){
    console.log(userInfo);
    // location.href = "index.html"; //転送したくなければコメントアウト→console.logが表示される
    //しないとconsole.logが一瞬で消える
    
    // 他のページに遷移
    window.location.href = "redirect.html";

  })
  
  .catch(function(error){
    console.log(error);
    $("#message").html(error);
  });
}

//ログイン
$("#login-button").on("click",function(){
  const email = $("#login-email").val();
  const password = $("#login-password").val();
  
  //loginUser関数を実行する
  loginUser(email,password);
  
  //上のfunction loginUser関数へ移動
  // const auth = getAuth();

  // signInWithEmailAndPassword(auth,email,password)
  // .then(function(userInfo){
  //   console.log(userInfo);
  //   location.href = "index.html"; //転送したくなければコメントアウト→console.logが表示される
  //   //しないとconsole.logが一瞬で消える
    
  // })
  
  // .catch(function(error){
  //   console.log(error);
  //   $("#message").html(error);
  // });


});

$(document).ready(function(){
//アイテムを配列形式に
let ItemList = []; 
  console.log(ItemList);

//リロード後もlocalStorageに残っているデータを表示
const Item = localStorage.getItem("purchaseItems");

if(Item !==null){
  ItemList = JSON.parse(Item);//JSON文字列を配列やオブジェクトに変換
  for(let i = 0; i < ItemList.length; i++){
    $("#result").append(`<li>${ItemList[i]}</li>`);
  };

}


$("#PurchaseButton").on("click",function(){
  //購入したアイテム情報を取得
  const purchaseItems = $('select[name="items"]').val();

  if(purchaseItems && rchaseItems.length > 0){

  //アイテムを配列に追加
  for(let i = 0; i < purchaseItems.length; i++){
    ItemList.push(purchaseItems[i]); //配列の末尾に追加
  }
  
  localStorage.setItem("purchaseItems", JSON.stringify(ItemList));
  console.log(ItemList);

  //結果を表示
  $("#result").html(""); //前の結果をクリア
    for(let i = 0; i < ItemList.length; i++){
      $("#result").append(`<li>${ItemList[i]}</li>`);
  
    }
  } else{
    console.log("No items selected");

  }
});

 // login-button の存在確認とクリックイベントの設定
 const loginButton = document.getElementById('login-button');
 if (loginButton) {
     loginButton.addEventListener('click', () => {
         // ログイン処理をここに追加
     });
 }

});

//ログアウト（修正版）
// $("#logoutButton").on("click",function(){
//   console.log("ログアウトボタンクリック"); 
//   const auth = getAuth();
//   console.log(auth);
//   signOut(auth)
//    .then(function(){
//     console.log("ログアウト成功"); 
//     location.href = "login.html";

//    })
//    .catch(function (error){
//     console.log("エラー",error); 
//     $("#message").html(error);
//    });
// });

//ログアウト（再修正）
document.getElementById('logoutButton').addEventListener('click', function() {
  console.log("ログアウトボタンクリック");
  const auth = getAuth();
  console.log(auth);
  signOut(auth)
    .then(function() {
      console.log("ログアウト成功");
      location.href = "login.html";
    })
    .catch(function(error) {
      console.log("エラー", error);
      document.getElementById('message').innerHTML = error.message;
    });
});


//ログアウト処理を担当する独自関数
// function logoutUser(){
//   const auth = getAuth();
//   signOut(auth)
//   .then(function(){
//     location.href = "login.html";
    
//   })
  
//   .catch(function(error){
//     console.log(error);
//     $("#message").html(error);
//   });

// }


//ログアウト
// $("#logout-button").on("click",function(){
//   logoutUser();
  //上のfunction logoutUser関数へ移動
  // const auth = getAuth();
  // signOut(auth)
  // .then(function(){
  //   location.href = "login.html";
    
  // })
  
  // .catch(function(error){
  //   console.log(error);
  //   $("#message").html(error);
  // });


// });



