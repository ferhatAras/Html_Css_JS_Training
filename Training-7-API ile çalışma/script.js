const searchGithub = async () => {
  const username = document.getElementById("searchInput").value;

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();

    const detailsContainer = document.querySelector(".details");
    detailsContainer.style.display = "flex"; // 'computedStyleMap' yerine 'style' kullanın

    document.getElementById("result").innerHTML = `
       <div class="profile">
           <div class="profile-image">
               <img src="${data.avatar_url}" alt="Profil Resmi"/>
           </div>  
           <div class="profile-details">
                <h2 class="name">${data.name || data.login}</h2> 
                <p class="username">@${data.login}</p> 
                <p class="bio">${data.bio || "Hesapta bio bilgisi yok"}</p>
 
                <div class="stats">
                     <div>
                           <div class="stats-name">Public repo Sayısı</div>
                           <div class="stats-value">${
                             data.public_repos
                           }</div>                      
                     </div>
                     <div>
                           <div class="stats-name">Takipçi Sayısı</div>
                           <div class="stats-value">${
                             data.followers
                           }</div>                      
                     </div>
                     <div>
                          <div class="stats-name">Takip Edilen Sayısı</div>
                          <div class="stats-value">${
                            data.following
                          }</div>                      
                     </div>
                </div>
 
                <div class="media">
                    <p>
                       <span class="media-value">${
                         data.location || "Bilgi Yok"
                       }</span>
                    </p>
                    <p>
                       <span class="media-value">${
                         data.blog || "Bilgi Yok"
                       }</span>
                    </p>
                    <p>
                       <span class="media-value">${
                         data.twitter_username || "Bilgi Yok"
                       }</span> <!-- 'twitter_usurname' yerine 'twitter_username' olmalı -->
                    </p>
                    <p>
                       <span class="media-value">${
                         data.company || "Bilgi Yok"
                       }</span>
                    </p>
                </div>
           </div>   
       </div>
       `;
  } catch (error) {
    console.error("Hata oluştu:", error);
  }
};
