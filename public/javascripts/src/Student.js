StudentNotebook.controller('StudentNotebookController', function ($scope) {

    var cleanForm = function(){
        $scope.newStudent.name = '';
        $scope.newStudent.phone = '';
        $scope.newStudent.course = '';
    };

    $scope.students = [
        {name: 'Albert Einstein', phone: '868 986 5899', course: 'Node.js'},
        {name: 'Albert Einstein', phone: '868 986 5899', course: 'Scala'},
        {name: 'Albert Einstein', phone: '868 986 5899', course: 'Python'},
        {name: 'Albert Einstein', phone: '868 986 5899', course: 'Java'},
        {name: 'Robert Gauss', phone: '868 986 5899', course: 'Javascript.js'},
        {name: 'Demitri Polesko', phone: '868 986 5899', course: 'Java'},
        {name: 'Maria Done', phone: '868 986 5899', course: 'Express'},
        {name: 'Victor Poshenko', phone: '868 986 5899', course: 'Mongo DB'},
        {name: 'Rober De Niro', phone: '868 986 5899', course: 'C'},
        {name: 'Marcus Aurelio', phone: '868 986 5899', course: 'C#'}
    ];

    $scope.Save = function () {
        $scope.students.push({name: $scope.newStudent.name, phone: $scope.newStudent.phone, course: $scope.newStudent.course});
        $scope.showForm();
        cleanForm();
    };

    $scope.showForm = function () {
        console.log('Valor de !$scope.formVisibility: ', !$scope.formVisibility);
        $scope.formVisibility = !$scope.formVisibility;
    };




});