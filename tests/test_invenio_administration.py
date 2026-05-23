# SPDX-FileCopyrightText: 2022 CERN.
# SPDX-License-Identifier: MIT

"""Module tests."""

from flask import Flask

from invenio_administration import InvenioAdministration


def test_version():
    """Test version import."""
    from invenio_administration import __version__

    assert __version__


def test_init():
    """Test extension initialization."""
    app = Flask("testapp")
    ext = InvenioAdministration(app)
    assert "invenio-administration" in app.extensions

    app = Flask("testapp")
    ext = InvenioAdministration()
    assert "invenio-administration" not in app.extensions
    ext.init_app(app)
    assert "invenio-administration" in app.extensions
