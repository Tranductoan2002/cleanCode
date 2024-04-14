// var courseApi ='http://localhost:3000/courses';
// fetch(courseApi)
//  .then(response => response.json())
//  .then(course => console.log(course));
 var listCoursesBlock = document.querySelector('#list-courses');
  var coursesApi = 'http://localhost:3000/courses';
  function start (){
   getCourse(renderCourses);
   handleCreateForm();
  };
  start();
  function getCourse(callback) {
    fetch(coursesApi)
    .then(response =>response.json())
    .then(callback);
  }
  function createCourse(data,callback){
    var options = {
         method:'POST',
         Headers:{
            'Content-Type': 'application/json'
         },
        body: JSON.stringify(data)
    };
    fetch(coursesApi,options)
    .then((response) => response.json())
    .then(callback);
  }
  function renderCourses(courses){
    // var listCoursesBlock = document.querySelector('#list-courses');
    var htmls = courses.map(course=>{
        return `
        <li>
         <h1>${course.id}</h1>
        <h5>${course.name}</h5>
        <p>${course.description}</p>
        <button onclick="deleteCourse(${course.id})">xóa</button>
        </li>
        `;
    });
    listCoursesBlock.innerHTML = htmls.join('');
    

  }
  function handleCreateForm() {
    var createBtn = document.querySelector('#create');
    createBtn.addEventListener('click', event => {
      event.preventDefault(); // Ngăn chặn hành vi mặc định của nút submit
      var name = document.querySelector('input[name="name"]').value;
      var description = document.querySelector('input[name="description"]').value;
      var formData={
        name:name,
        description:description
      };
      createCourse(formData,e=>{
        e.preventDefault();
        getCourse(renderCourses);
      });
    });
  }
  