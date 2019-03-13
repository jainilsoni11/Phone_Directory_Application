// Jainil Barbhaya//
window.onload = function(){
	var loginform = document.getElementById("loginformdiv");
	var addbtn = document.getElementById("Addbtn");
	var addsubscriber = document.getElementById("AddSubscriber");
	var cancel = document.getElementById('Cancelbtn');
	var view_list = document.getElementById('ShowList');
	var dataTable = document.getElementById('table_of_records');
	var headingTable = document.getElementById('table_of_heading');
	var title_page = document.getElementById('main_title');
	var delbtn = document.getElementById('dltbtn');


	var fname = document.getElementById("sub_name")
	var phoneno = document.getElementById("phone_no")
	addsubscriber.addEventListener("click",function(){			//Event listener for add subscriber
		loginform.style.display = "block";
		title_page.style.display = "none";
		headingTable.style.display = "none";
		dataTable.style.display = "none";
	});
	cancel.addEventListener("click",function(){					//Event listener to hide the form
		loginform.style.display = "none";
		title_page.style.display = "block";
		headingTable.style.display = "none";
		dataTable.style.display = "none";
	});
	var array_of_records = [] ;
	addbtn.addEventListener("click",AddRecords);				//Actual listener for adding record
	view_list.addEventListener("click",ShowRecords);			//Actual listener for Display record
	dataTable.addEventListener("click",RemoveRecords);			//Actual listener for Remove record

	function jsonStructure(fname,phoneno){
		this.fname = fname;
		this.phoneno = phoneno;
	}

	function AddRecords(){													//function to add record to the localstorage
		if(confirm("Do You Want To Add Record ??")){
			var my_object = new jsonStructure(fname.value,phoneno.value);
			array_of_records = JSON.parse(localStorage['records']) || [];
			array_of_records.push(my_object);
			localStorage['records'] = JSON.stringify(array_of_records);
		}
		else{
			title_page.style.display = "none";
		}
	}
	function ShowRecords(){													//function to display all the records
		if(localStorage['records'] == undefined){
			localStorage['records'] = "[]";
		}
		else
		{
			loginform.style.display = "none";
			title_page.style.display = "none";
			headingTable.style.display = "block";
			dataTable.style.display = "block";	
			data_of_dir = JSON.parse(localStorage['records']);
			//console.log(data_of_dir);
			dataTable.innerHTML = '';
			for(var i in data_of_dir){
				var my_data = '<tr>';
				my_data += '<td>'+ data_of_dir[i].fname + '</td>';
				my_data += '<td>'+ data_of_dir[i].phoneno + '</td>';
				my_data += '<td><input type="submit" value="Delete" id="dltbtn" class="w3-button w3-green deletebtn" data-id="' + i + '"></td>';
				my_data += '</tr>';
				dataTable.innerHTML += my_data;
			}
		}
	}
	function RemoveRecords(e){												// function to remove particular record
		if(e.target.classList.contains("deletebtn")){
			var r_id = e.target.getAttribute("data-id");
			array_of_records = JSON.parse(localStorage['records']);
			array_of_records.splice(r_id,1);
			localStorage['records'] = JSON.stringify(array_of_records);
			ShowRecords();
		}
	}
}
