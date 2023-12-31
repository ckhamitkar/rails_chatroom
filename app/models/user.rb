class User < ApplicationRecord
    validates_uniqueness_of :username
    def self.generate
        create(username: Haikunator.haikunate)
    end
end
