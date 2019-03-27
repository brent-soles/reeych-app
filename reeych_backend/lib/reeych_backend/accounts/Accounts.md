# Accounts Context

## Credential, User

The Accounts context contains the User and Credential schemas, as well as details about their relations.
Currently, there is a one-to-one relation between the two. A user can only have a single credential. The reason being, there is no need
to interface with an outside auth system via OAuth or no need for a third party integration (... yet ...).

## 1 Schema Definitions (at a glance)

Currently, the each schema has bare-bones fields for operation upon them. The all modules implementing schema, use an adapted Ecto.Schema,
in which guid's are used for ID's, rather than integer based ID's. These are auto-generated upon creation.

### 1.1 User

```elixir
schema "users" do
  field :first_name, :string
  field :job_title, :string
  field :last_name, :string
  field :verified, :boolean

  has_one :credential, Credential
  many_to_many :spaces, ReeychBackend.Spaces.Space, join_through: ReeychBackend.Relations.UsersSpaces

  timestamps()
end
```

In order to represent users data in the GUI, we have at this point in time, the minimum amount of info needed to get off the ground.

Future data reps needed:

* 

#### 1.1.1 Relations

Current:

* Credential : one-to-one. Relation is through: Ecto defined relations
* Spaces : many-to-many. Relation is through: ```ReeychBackend.Relations.UserSpace```

Future relations needed:

* Cards : one-to-many. Relation will be handled by defined schema in order to hold metadata about relation

#### 1.1.2 Methods in User module

The User module implements the standard Ecto changeset.

```elixir
def changeset(user, attrs) do
  user
  |> cast(attrs, [:first_name, :last_name, :job_title])
  |> validate_required([:first_name, :last_name, :job_title])
end
```

### 1.2 Credential

```elixir
@primary_key false
schema "credentials" do
  field :email, :string, primary_key: true
  field :password, :string
  belongs_to :user, User, type: Ecto.ShortUUID

  timestamps()
end
```

There is no generated primary key in the Credential schema, and the ```:email``` field is used to enforce unique pkey constraint.
The password is hashed using Argon2, and is stored as such. No plaintext passwords are stored in the system.

#### 1.2.1 Relations

Current:

* User : one-to-one. Relation is through: Ecto defined relations

Future relations needed:

* N/A at the moment

#### 1.2.2 Methods in Credential module

The credential module currently implements a modified changeset which verifies email strings.

```elixir
def changeset(credential, attrs) do
  credential
  |> cast(attrs, [:email, :password, :user_id])
  |> validate_required([:email, :password, :user_id])
  |> validate_format(:email, ~r/[A-Za-z0-9]+\@[A-Za-z]+\.(com|net|gov|org)/s)
  |> unique_constraint(:email)
end
```

As well as a function that supplys the Argon2 hashing function:

```elixir
def hash_password(changeset) do
  password = get_field(changeset, :password)

  unless is_nil(password) do
    # Argon2 returns a tuple, with hashed password in password_hash
    put_change(changeset, :password, Argon2.add_hash(password).password_hash)
  end
end
```