import dynaconf


settings = dynaconf.Dynaconf(
    envvar_prefix='AFL_IDL2JS',
    settings_files=[
        'settings.toml',
    ],
    environments=True,
    load_dotenv=True,
)
