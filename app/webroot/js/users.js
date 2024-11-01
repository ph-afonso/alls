const handleCreatingUser = () => {
	$.confirm({
		title: 'Criar credenciais de acesso',
		theme: 'modern',
		closeIcon: true,
		draggable: false,
		content: `
			<form id="formCreatingUserLogin" class="formName">
				<div class="form-group">
					<label>Insira o e-mail</label>
					<input type="text" placeholder="Seu e-mail" class="formCretingLoginEmail form-control" required />
					<br>
					<label>Insira a senha</label>
					<input type="text" placeholder="Sua senha" class="formCreatingLoginPassword form-control" required />
				</div>
			</form>
		`,
		buttons: {
			formSubmit: {
				text: 'Salvar',
				btnClass: 'btn-blue',
				action: function () {
					var userCreatingLoginEmail = this.$content.find('.formCretingLoginEmail').val();
					var userCreatingLoginPassword = this.$content.find('.formCreatingLoginPassword').val();
					if(!userCreatingLoginEmail){
						$.alert('O campo de <b>e-mail</b> não pode ser enviado vazio.');
						return false;
					}

					var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
					if (!emailPattern.test(userCreatingLoginEmail)) {
						$.alert('O campo de <b>e-mail</b> deve conter um e-mail válido.');
						return false;
					}

					if(!userCreatingLoginPassword){
						$.alert('O campo de <b>senha</b> não pode ser enviado vazio.');
						return false;
					}

					$.ajax({
						url: 'createusers',
						method: 'POST',
						data: {
							username: userCreatingLoginEmail,
							password: userCreatingLoginPassword
						},
						success: function(response) {
							$.alert(response.message);
						},
						error: function(xhr, status, error) {
							$.alert(response.message);
							console.error(xhr, status, error);
						}
					});
				}
			},
			cancelar: function () {
			},
		},
		onContentReady: function () {
			var jc = this;
			this.$content.find('form').on('submit', function (e) {
				e.preventDefault();
				jc.$$formSubmit.trigger('click');
			});
		}
	});
}
