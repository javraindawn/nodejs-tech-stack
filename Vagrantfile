# BUILD ALL WITH: vagrant up --no-parallel

POSTGRES_PASSWORD = "50m3R4ndOmP455w0rD!"

Vagrant.configure("2") do |config|

  config.vm.define "postgres" do |v|

    v.vm.provider "docker" do |d|
      d.vagrant_machine = "project-docker-host"
      d.vagrant_vagrantfile = "./dockerhost/Vagrantfile"
      d.image = "postgres:9.4.4"
      d.env = { :POSTGRES_PASSWORD => POSTGRES_PASSWORD }
      d.name = "project_postgres"
      d.remains_running = true
      d.volumes = ["/opt/volumes/project/postgres:/var/lib/postgresql/data"]
      d.ports = [
        "5432:5432"   # default postgres port
      ]
    end
  end

  config.vm.define "api" do |v|

    v.vm.synced_folder ".", "/opt/app", type: "rsync",
      rsync__exclude: get_ignored_files(),
      rsync__args: ["--verbose", "--archive", "--delete", "--copy-links"]

    v.vm.provider "docker" do |d|
      d.vagrant_machine = "project-docker-host"
      d.vagrant_vagrantfile = "./dockerhost/Vagrantfile"
      d.build_dir = "."
      d.build_args = ['--tag="project/api"']
      d.remains_running = true
      d.env = { :POSTGRES_PASSWORD => POSTGRES_PASSWORD }
      d.ports = [
        "8069:8069"    # main application port
      ]
      d.link("project_postgres:postgres")
    end
  end

end

def get_ignored_files()
  ignore_file   = ".rsyncignore"
  ignore_array  = []

  if File.exists? ignore_file and File.readable? ignore_file
    File.read(ignore_file).each_line do |line|
      ignore_array << line.chomp
    end
  end

  return ignore_array
end
