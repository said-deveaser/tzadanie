<?php
if (file_get_contents('php://input')) {
    
    $action = json_decode(file_get_contents('php://input'));
    switch ($action->action) {
        case 'GET_WORKERS':
            $workers = [
                [
                    "id" => 1,
                    "name" => "Иван Иванов",
                    "position" => "Директор",
                    "statuses" => [
                        ["id" => 1, "name" => "Резидент"],
                        ["id" => 2, "name" => "Пенсионер"],
                    ],
                    "salaries" => [
                        ["id" => 1, "date" => "10.10.2010", "sum" => 85000],
                        ["id" => 2, "date" => "12.30.2015", "sum" => 185000]
                    ]
                ],
                [
                    "id" => 2,
                    "name" => "Дмитрий Дмитриевич",
                    "position" => "HR",
                    "statuses" => [
                        ["id" => 1, "name" => "Резидент"],
                        ["id" => 2, "name" => "Инвалид"],
                    ],
                    "salaries" => [
                        ["id" => 1, "date" => "11.10.2020", "sum" => 155000],
                        ["id" => 2, "date" => "12.30.2015", "sum" => 185000]
                    ]
                ],
                [
                    "id" => 3,
                    "name" => "Николай Иванов",
                    "position" => "Зам. Директор",
                    "statuses" => [
                        ["id" => 1, "name" => "Резидент"],
                        ["id" => 2, "name" => "Пенсионер"],
                    ],
                    "salaries" => [
                        ["id" => 1, "date" => "10.10.2008", "sum" => 125000],
                        ["id" => 2, "date" => "12.30.2015", "sum" => 185000]
                    ]
                ]
            ];
            echo json_encode($workers);
            break;
        
        default:
            echo  json_encode(["error" => "haven't action"]);
            break;
    }
}
