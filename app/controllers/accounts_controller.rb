  class AccountsController < ActionController::Base

    # GET /accounts
    # GET /accounts.json
    def index
      @accounts = Account.all
  
      respond_to do |format|
        format.html # index.html.erb
        format.json { render json: @accounts }
      end
    end
  
    # GET /accounts/1
    # GET /accounts/1.json
    def show
      @account = Account.find(params[:id])
  
      respond_to do |format|
        format.html # show.html.erb
        format.json { render json: @account }
      end
    end
  
    # GET /accounts/new
    # GET /accounts/new.json
    def new
      @account = Account.new
  
      respond_to do |format|
        format.html # new.html.erb
        format.json { render json: @account }
      end
    end
  
    # GET /accounts/1/edit
    def edit
      @account = Account.find(params[:id])
    end
  
    # POST /accounts
    # POST /accounts.json
    def create
		params[:account].delete(:contact)
      @account = Account.new(params[:account])

      respond_to do |format|
        if @account.save
					Permission::DEFAULT_PERMISSIONS.each_key do |perm|
						Permission.create!(:account_id => @account.id, :name => perm.titleize, :value => perm)
					end
	
					Role::DEFAULT_ROLES.each_value do |role_attributes|
						role_attributes[:account_id] = @account.id
						Role.create!( role_attributes )
					end
	
					Role::DEFAULT_ASSIGNMENTS.each do |internal_role_name, perms|
						role = Role.find_by_internal_name_and_account_id(internal_role_name, @account.id)
						perms.map! { |perm| Permission.find_by_value_and_account_id(perm, @account.id) }
						role.permissions << perms
					end
	
					password = params[:user].delete(:password)
					confirm = params[:user].delete(:password_confirmation)
					@admin = User.new(:email => params[:user][:email], :username => params[:user][:username])
					@admin.password = password
					@admin.password_confirmation = confirm
					@admin.account = @account
					@admin.roles << Role.find_by_internal_name_and_account_id('administrator', @account.id)
					
					contact = @admin.build_contact(:account_id => @account.id)
					contact.addresses.build(:account_id => @account.id)
					contact.phone_numbers.build(:account_id => @account.id)
					@admin.save(:validate => false)

          format.html { redirect_to @account, notice: 'Account was successfully created.' }
          format.json { render json: @account, status: :created, location: @account }
        else
          format.html { render action: "new" }
          format.json { render json: @account.errors, status: :unprocessable_entity }
        end
      end
    end
  
    # PUT /accounts/1
    # PUT /accounts/1.json
    def update
      @account = Account.find(params[:id])
  
      respond_to do |format|
        if @account.update_attributes(params[:account])
          format.html { redirect_to @account, notice: 'Account was successfully updated.' }
          format.json { head :ok }
        else
          format.html { render action: "edit" }
          format.json { render json: @account.errors, status: :unprocessable_entity }
        end
      end
    end
  
    # DELETE /accounts/1
    # DELETE /accounts/1.json
    def destroy
      @account = Account.find(params[:id])
      @account.destroy
  
      respond_to do |format|
        format.html { redirect_to accounts_url }
        format.json { head :ok }
      end
    end
  end
