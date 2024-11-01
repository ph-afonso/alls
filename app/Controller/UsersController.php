<?php
App::uses('AppController', 'Controller');

class UsersController  extends AppController {
	public function login() {
		$this->layout = 'login';
	}

	public function createusers() {
		$this->layout = 'ajax';
		$this->autoRender = false;

		$this->response->type('json');

		if ($this->request->is('post')) {
			$username = $this->request->data('username');
			$password = $this->request->data('password');

			if (empty($username)) {
				$response = array('status' => 'error', 'message' => 'O campo de e-mail não pode ser vazio.');
				echo json_encode($response);
				return;
			}

			if (!filter_var($username, FILTER_VALIDATE_EMAIL)) {
				$response = array('status' => 'error', 'message' => 'O campo de e-mail deve conter um e-mail válido.');
				echo json_encode($response);
				return;
			}

			if (empty($password)) {
				$response = array('status' => 'error', 'message' => 'O campo de senha não pode ser vazio.');
				echo json_encode($response);
				return;
			}

			$userData = array(
				'User' => array(
					'username' => $username,
					'password' => $password
				)
			);

			if ($this->User->save($userData)) {
				$response = array('status' => 'success', 'message' => 'Usuário criado com sucesso!');
			} else {
				$response = array('status' => 'error', 'message' => 'Ocorreu um erro ao salvar o usuário.');
			}
		} else {
			$response = array('status' => 'error', 'message' => 'Método de requisição inválido.');
		}

		echo json_encode($response);
	}
}
