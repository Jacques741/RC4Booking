document.addEventListener("DOMContentLoaded", function() {
    var timeContainer = document.getElementById("timeContainer");
    
    fetch("/fetch_times")
      .then(response => response.json())
      .then(data => {
        if (data.status === "success") {
          for (let time in data.result) {
            let booked = data.result[time];
            
            let timeButton = document.createElement("button");
            timeButton.textContent = time;
            
            if (booked === 0) {
              timeButton.classList.add("available");
              timeButton.addEventListener("click", function() {
                //TO-DO
                let formData = new FormData();
                formData.append("time", time)
                fetch('/selected_time', {
                    method:"POST",
                    body:formData
                })
                .then(response => response.json())
                .then(data => {
                    window.alert(data.message)
                    window.location.href = "/booking_times";
                })
              });
            } else {
              timeButton.classList.add("booked");
              timeButton.disabled = true;
            }
            
            timeContainer.appendChild(timeButton);
          }
        }
      })
      .catch(error => {
        console.error("Error", error);
      });
  });
  